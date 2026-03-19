const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

// Initialize Google Generative AI
const apiKey = process.env.GOOGLE_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Conversation history for context
const conversationHistory = {};

// Test route
app.get("/", (req, res) => {
  res.send("AI Chatbot Backend Running (Production Mode)");
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", aiProvider: apiKey ? "Google Generative AI" : "Demo Mode" });
});

// Chat route with AI integration
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const sessionId = req.body.sessionId || "default";

    // Initialize conversation history for this session
    if (!conversationHistory[sessionId]) {
      conversationHistory[sessionId] = [];
    }

    let reply = "";

    if (apiKey && genAI) {
      try {
        // Use real AI
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        // Add user message to history
        conversationHistory[sessionId].push({
          role: "user",
          parts: [{ text: userMessage }]
        });

        // Generate response
        const chat = model.startChat({
          history: conversationHistory[sessionId].slice(0, -1), // Exclude the message we just added
          generationConfig: {
            maxOutputTokens: 1024,
            temperature: 0.7,
          },
        });

        const result = await chat.sendMessage(userMessage);
        reply = result.response.text();

        // Add bot response to history
        conversationHistory[sessionId].push({
          role: "model",
          parts: [{ text: reply }]
        });

        // Keep only last 10 exchanges for context
        if (conversationHistory[sessionId].length > 20) {
          conversationHistory[sessionId] = conversationHistory[sessionId].slice(-20);
        }

      } catch (aiError) {
        console.log("AI Error, falling back to demo:", aiError.message);
        reply = generateDemoResponse(userMessage);
      }
    } else {
      // Demo mode fallback
      reply = generateDemoResponse(userMessage);
    }

    res.json({ reply, timestamp: new Date().toISOString() });

  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({
      reply: "❌ Something went wrong. Please try again.",
      error: error.message
    });
  }
});

// Clear conversation history
app.post("/clear-session", (req, res) => {
  const sessionId = req.body.sessionId || "default";
  if (conversationHistory[sessionId]) {
    delete conversationHistory[sessionId];
  }
  res.json({ success: true });
});

// Export conversations
app.post("/export", (req, res) => {
  const messages = req.body.messages || [];
  const format = req.body.format || "txt";
  
  let content = "";
  
  if (format === "json") {
    content = JSON.stringify(messages, null, 2);
    res.setHeader("Content-Type", "application/json");
  } else if (format === "csv") {
    content = "Sender,Message,Timestamp\n";
    messages.forEach(m => {
      const text = (m.text || "").replace(/"/g, '""');
      content += `"${m.sender}","${text}","${m.timestamp || new Date().toISOString()}"\n`;
    });
    res.setHeader("Content-Type", "text/csv");
  } else {
    content = messages.map(m => `${m.sender.toUpperCase()}: ${m.text}`).join("\n\n");
    res.setHeader("Content-Type", "text/plain");
  }
  
  res.setHeader("Content-Disposition", `attachment; filename="chat-${new Date().toISOString().slice(0, 10)}.${format}"`);
  res.send(content);
});

function generateDemoResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase().trim();
  let reply = "";
  
  if (lowerMessage.match(/^(hey|hi|hello|yo|sup)/i)) {
    reply = "👋 Hey there! I'm your AI assistant. How can I help you today?";
  } else if (lowerMessage.match(/(hello|hi|hey)\s*how.*you|how\s*are\s*you/i)) {
    reply = "I'm doing great, thanks for asking! 😊 What can I help you with?";
  } else if (lowerMessage.match(/what.*your.*name|who.*you/i)) {
    reply = "I'm ChatBot, your AI assistant! I'm here to help with questions, have conversations, or just chat. Nice to meet you!";
  } else if (lowerMessage.match(/help|support|can you help/i)) {
    reply = "Absolutely! I can help with:\n• Answering questions\n• Writing and coding\n• General knowledge\n• Problem solving\nWhat do you need help with?";
  } else if (lowerMessage.match(/joke|funny|laugh/i)) {
    const jokes = [
      "Why did the programmer quit his job? Because he didn't get arrays! 😄",
      "Why do Java developers wear glasses? Because they don't C#! 👓",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡"
    ];
    reply = jokes[Math.floor(Math.random() * jokes.length)];
  } else if (lowerMessage.match(/goodbye|bye|see you|exit|quit/i)) {
    reply = "👋 Goodbye! It was nice chatting with you. Have a great day!";
  } else if (lowerMessage.match(/thanks|thank you|appreciate|thanks for/i)) {
    reply = "You're very welcome! 😊 Happy to help anytime!";
  } else if (lowerMessage.match(/time|what.*time|current.*time/i)) {
    reply = `The current time is ${new Date().toLocaleTimeString()}`;
  } else if (lowerMessage.match(/date|what.*date|today/i)) {
    reply = `Today is ${new Date().toLocaleDateString()}`;
  } else {
    reply = `You said: "${userMessage}". That's interesting! 💭`;
  }
  
  return reply;
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (apiKey) {
    console.log("✅ Google Generative AI enabled");
  } else {
    console.log("⚠️ Running in Demo Mode - Set GOOGLE_API_KEY to enable real AI");
  }
});