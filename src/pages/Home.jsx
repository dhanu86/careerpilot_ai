import { useState } from "react";
import API from "../services/api";

function Home() {
  const [message, setMessage] = useState("");

  const testBackend = async () => {
    try {
      const response = await API.get("/test");
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
      setMessage("Connection Failed");
    }
  };

  return (
    <div>
      <h1>CareerPilot AI</h1>

      <button onClick={testBackend}>
        Test Backend Connection
      </button>

      <h2>{message}</h2>
    </div>
  );
}

export default Home;