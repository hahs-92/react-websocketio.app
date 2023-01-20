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
    <div className="flex justify-center h-screen bg-zinc-800 text-white">
      <section className="p-2 flex flex-col h-full w-full max-w-xl overflow-y-auto  bg-zinc-700">
        <form className="bg-zinc-600 p-10" onSubmit={onHandleSubmit}>
          <input
            className="w-full border-2 border-zinc-500 p-2 text-black"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
          />
        </form>

        <ul className="h-auto">
          {messages &&
            messages.map((m, idx) => (
              <li
                className={`my-2 p-2 w-3/5 text-sm rounded-md ${
                  m.from === "Me" ? "bg-sky-700 ml-auto" : "bg-black"
                }`}
                key={`${idx} - ${m.from}`}
              >
                <p>
                  <strong>{m.from}</strong>
                </p>
                <p className="break-words">{m.body}</p>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
