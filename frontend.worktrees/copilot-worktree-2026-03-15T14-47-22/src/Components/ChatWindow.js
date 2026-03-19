import React, { useState } from "react";
import axios from "axios";
import Message from "./Message";

function ChatWindow() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Voice Recognition
  const recognition = new window.webkitSpeechRecognition();
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setInput(transcript);
  };

  const startVoice = () => {
    recognition.start();
  };

  // Text to Speech
  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  const sendMessage = async () => {

    if (!input) return;

    const userMsg = { sender: "user", text: input };

    setMessages((prev) => [...prev, userMsg]);

    try {

      const res = await axios.post("http://localhost:5000/chat", {
        message: input
      });

      const botReply = res.data.reply;

      const botMsg = { sender: "bot", text: botReply };

      setMessages((prev) => [...prev, botMsg]);

      speak(botReply);

    } catch (error) {

      console.log(error);

      const botMsg = {
        sender: "bot",
        text: "Server error"
      };

      setMessages((prev) => [...prev, botMsg]);

    }

    setInput("");

  };

  return (

    <div className="chat-window">

      <div className="messages">

        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} />
        ))}

      </div>

      <div className="input-box">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />

        <button onClick={sendMessage}>Send</button>

        <button onClick={startVoice}>🎤</button>

      </div>

    </div>

  );

}

export default ChatWindow;