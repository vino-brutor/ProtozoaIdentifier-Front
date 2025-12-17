import { useEffect, useState } from "react";
import "./app.css";
import { ConfidenceBar } from "./Components/ConfidenceBar/ConfidenceBar";
import { GoogleLogin } from "@react-oauth/google";
import { HistoricItem } from "./Components/historicItem/HistoricItem";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewURL, setPreviewURL] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [historic, setHistoric] = useState([]);

  const handleGoogleSucess = async (credentialResponse) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/google-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ googleToken: credentialResponse.credential }),
      });

      if (!res.ok) {
        return alert("Error while logging in: " + res.statusText);
      }

      const data = await res.json();
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("protzoa_token", data.token);
    } catch (error) {
      alert("Error while logging in: " + error.message);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; //pega o evento de enviar um file

    if (file) {
      setSelectedFile(file);

      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }

      setPreviewURL(URL.createObjectURL(file));
    } else {
      console.log("Erro ao carregar o arquivo");
    }
  };

  const handleSubmmit = async (event) => {
    console.log("Enviando arquivo");

    if (!selectedFile) {
      alert("Choose a file to submmit");
      return;
    }

    try {
      setIsLoading(true);

      //criamos o nosso envelope prop backend
      const formData = new FormData();

      //colocamos nosso arquivo q o usuário mandou
      formData.append(`image`, selectedFile);

      //faz o envio para o back da imagem que temos
      const rawResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Bearer é o tipo de token que o backend usa
        },
        body: formData,
      });
      // rawResponse
      // .then(response => response.json()) //pegamos a resposta e a data do backend usando as promises
      // .then(data => {
      //   console.log(data)
      //   setResult(data)
      // })
      // .catch(error => console.error(error));
      if (!rawResponse.ok) {
        throw new Error("Error while uploading image");
      }

      const data = await rawResponse.json();
      console.log(data);
      setResult(data);
    } catch (error) {
      console.error("Erro capturado:", error);
      console.error("Nome do erro:", error.name);
      console.error("Mensagem:", error.message);
      alert("Erro ao enviar imagem: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // use effect pq queremos q ele pegue o historico apenas se o menu abrir

  useEffect(() => {
    if (isMenuOpen) {
      handleMenuOpen();
    }
  }, [isMenuOpen]);

  const handleMenuOpen = async () => {
    const rawResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/api/prediction-historic`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Bearer é o tipo de token que o backend usa
        },
      }
    );

    if (!rawResponse.ok) {
      throw new Error("Error while fetching historic");
    }

    const data = await rawResponse.json();

    console.log(data)

    if (Array.isArray(data.predictionHistoric)) {
      setHistoric(data.predictionHistoric);
    } else {
      setHistoric([]);
    }

  };

  return (
    <div className="container" style={{ position: "relative" }}>
      {!user && (
        <div className="login-overlay-container">
          <div className="login-card">
            <h1 className="title-login-card">Welcome</h1>
            <p className="text-login-card">
              To use this application you need to login with google
            </p>
            <p className="text-login-card">
              This way we can save your historic of analysis
            </p>

            <div className="google-btn-wrapper">
              <GoogleLogin
                onSuccess={handleGoogleSucess}
                onError={() => {
                  console.log("login failed");
                }}
              />
            </div>

            <p className="free-text-login-card">It's free!</p>
          </div>
        </div>
      )}
      <div
        className={`split-content-wrapper ${!user ? "blurred-effect" : ""}`}
      >
        <div className="input-side split-column">
          <button
            className="historic-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>

          
          <div className={`historic-menu-container ${isMenuOpen ? "open" : ""}`}>
            <button className="exit-historic-btn" onClick={() => setIsMenuOpen(false)}>
              X
            </button>
            {
              historic.map((item) => {
                return <HistoricItem key={item.id} prediction={item} />;
              })
            }
          </div>
          

          <h1 className="protozoaIdentifier-Title">Protozoa Identifier</h1>
          <div className="inputs-div">
            <p>Send a protozoa image and click on the send button</p>
            <div className="custom-input-group">
              <input
                disabled={isLoading}
                type="file"
                name="image"
                id="imageInput"
                onChange={handleFileChange}
                className="hidden-input"
              />
              <label
                htmlFor="imageInput"
                className={isLoading ? "disabled-label" : "file-label"}
              >
                {previewURL ? "Image selected" : "Select a image"}
              </label>
            </div>
            <button
              type="button"
              id="uploadBtn"
              onClick={handleSubmmit}
              disabled={isLoading}
            >
              Send Image
            </button>
          </div>
        </div>

        <div className="output-side split-column">
          {isLoading ? (
            <div className="loading-Card">
              <h2>Processing image...</h2>
              <p>This will take a few seconds</p>
            </div>
          ) : result ? (
            <div className="result-card">
              <h2>{result.prediction.className}</h2>
              <img
                className="imagePreview"
                src={previewURL}
                alt={"Preview of the image from the user"}
              />
              <p>
                Your protozoa is a{" "}
                <span style={{ fontWeight: `bold` }}>
                  {result.prediction.className}
                </span>
              </p>
              <ConfidenceBar value={result.prediction.confidence} />
            </div>
          ) : previewURL ? (
            <div className="preview-card">
              <h2>Analysis Preview</h2>
              <img
                className="imagePreview"
                src={previewURL}
                alt={"Preview of the image from the user"}
              />
            </div>
          ) : (
            <div className="inital-Card">
              <h2>Waiting for image</h2>
              <p>Click on the button to send an image!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
