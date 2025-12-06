import { useState } from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; //pega o evento de enviar um file

    if (file) {
      setSelectedFile(file);
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
      //criamos o nosso envelope prop backend
      const formData = new FormData();

      //colocamos nosso arquivo q o usuário mandou
      formData.append(`image`, selectedFile);
      console.log("2. Arquivo selecionado:", selectedFile.name, selectedFile.type);
      console.log("3. Indo fazer o fetch...");

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

      console.log("passou pelo fetch")
      console.log("Response status:", rawResponse.status);
      console.log("Response ok:", rawResponse.ok);

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
    }
  };

  return (
    <div className="container">
      <h1>Protozoa Identifer</h1>
      <p>A little project made by Vitor Bruno</p>

      <div className="uploadDiv">
        <input
          type="file"
          id="uploadFile"
          name="uploadFile"
          onChange={handleFileChange}
        />
        <button type="button" id="uploadBtn" onClick={handleSubmmit}>
          Upload image
        </button>
      </div>

      {/*Se result exsite, mostra o html (da pra usar js entre {})*/}
      {result && (
        <div className="resultDiv">
          <h2>Analysis Result</h2>
          <p>Protozoa: {result.prediction.className}</p>
          <p>Confidente: {result.prediction.confidence}</p>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt={result.prediction.className}
          />
        </div>
      )}
    </div>
  );
}

export default App;
