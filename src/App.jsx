import { useState } from "react";
import "./app.css"
import { ConfidenceBar } from "./Components/ConfidenceBar/ConfidenceBar";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewURL, setPreviewURL] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; //pega o evento de enviar um file

    if (file) {
      setSelectedFile(file);

      if (previewURL) {
        URL.revokeObjectURL(previewURL)
      }

      setPreviewURL(URL.createObjectURL(file))

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

      setIsLoading(true)



      //criamos o nosso envelope prop backend
      const formData = new FormData();

      //colocamos nosso arquivo q o usuário mandou
      formData.append(`image`, selectedFile);

      //faz o envio para o back da imagem que temos
      const rawResponse = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
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
      setIsLoading(false)
    }
  };

  return (
    <div className="container ">
      <div className="input-side split-column">
        <h1 className="protozoaIdentifier-Title">Protozoa Identifer</h1>
        <div className="inputs-div">
          <p>Send a protozoa image and click on the send button</p>
          <div className="custom-input-group">
            <input 
              type="file" 
              name="image" 
              id="imageInput" 
              onChange={handleFileChange} 
              className="hidden-input" 
            />    
            <label htmlFor="imageInput" className="file-label">
            {previewURL ? "Image selected" : "Select a image"} 
            </label>
          </div>
          <button type="button" id="uploadBtn" onClick={handleSubmmit} disabled={isLoading}>Send Image</button>
        </div>
      </div>

      <div className="output-side split-column">
        { isLoading ? (
        <div className="loading-Card">
          <h2>Processing image...</h2>
          <p>This will take a few seconds</p>
        </div>
        ) : result ? (
          <div className="result-card">            
            <img
              src={previewURL}
              alt={"Preview of the image from the user"}
            />
            <p>Protozoa: {result.prediction.className}</p>
            <p>Confidence: {result.prediction.confidence}</p>
            <ConfidenceBar value={result.prediction.confidence} />
          </div>
        ) : previewURL ? (
          <div className="preview-card">
            <h2>Analysis Preview</h2>
            <img
              src={previewURL}
              alt={"Preview of the image from the user"}
            />
          </div>
        ) : (
          <div className="inital-Card">
            <h2>Waiting for image</h2>
            <p>Click on the button to send an image!</p>
          </div>
        )
      }
      </div>

    </div>
  );
}

export default App;
