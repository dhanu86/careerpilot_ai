import { useState } from "react";
import API from "../services/api";

function StudyAssistant() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  const uploadFile = async () => {
    try {
      if (!file) {
        alert("Select a PDF first");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await API.post("/upload", formData);

      setMessage(response.data.message);

    } catch (error) {
      console.log("UPLOAD ERROR:", error);
      setMessage("Upload Failed");
    }
  };

  const askQuestion = async () => {
    try {
      if (!question) {
        alert("Enter a question");
        return;
      }

      setAnswer("Thinking...");

      const response = await API.post("/ask", {
        question: question
      });

      console.log("ASK RESPONSE:", response.data);

      setAnswer(response.data.answer);

    } catch (error) {
      console.log("ASK ERROR:", error);
      setAnswer("Error getting answer");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Study Assistant</h1>

      {/* Upload */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={uploadFile}>Upload PDF</button>

      <p>{message}</p>

      <hr />

      {/* Ask */}
      <h3>Ask Questions</h3>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={askQuestion}>Ask</button>

      {/* SAFE RENDER */}
      <div style={{ marginTop: "20px" }}>
        <h4>Answer:</h4>
        <p>{answer || "No answer yet"}</p>
      </div>
    </div>
  );
}

export default StudyAssistant;