import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";

// este objecto nos permite comunicarnos con el back
const socket = io("http://localhost:4000");

function App() {
  const [message, setMessage] = useState("");

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  const receiveMessage = (message: string) => {
    console.log({ message });
  };

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  return (
    <div className="App">
      <form onSubmit={onHandleSubmit}>
        <input
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
