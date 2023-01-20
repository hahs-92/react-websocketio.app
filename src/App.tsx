import { io } from "socket.io-client";
import "./App.css";

// este objecto nos permite comunicarnos con el back
const socket = io("http://localhost:4000");

function App() {
  return (
    <div className="App">
      <h2>Hi there¡</h2>
    </div>
  );
}

export default App;
