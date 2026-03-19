import React from "react";
import ChatWindow from "./Components/ChatWindow";
import Sidebar from "./Components/Sidebar";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default App;