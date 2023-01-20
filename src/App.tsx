import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";
import { IMessage } from "./model/message.model";

// este objecto nos permite comunicarnos con el back
const socket = io("http://localhost:4000");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("message", message);
    const newMessage: IMessage = {
      from: "Me",
      body: message,
    };
    setMessages((prev) => [newMessage, ...prev]);
    setMessage("");
  };

  const receiveMessage = (message: IMessage) => {
    setMessages((prev) => [message, ...prev]);
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

      <section>
        {messages &&
          messages.map((m, idx) => (
            <article key={`${idx} - ${m.from}`}>
              <p>
                <strong>{m.from}</strong> -{m.body}
              </p>
            </article>
          ))}
      </section>
    </div>
  );
}

export default App;
