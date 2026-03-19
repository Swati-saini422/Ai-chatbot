# 🤖 AI Chatbot - Full-Featured Chat Application

A modern, feature-rich AI chatbot application built with React and Node.js, powered by Google Generative AI.

## ✨ Features

### Core Chat Features
- 💬 **Real-time Chat** - Seamless messaging with AI assistant
- 🎤 **Voice Input** - Speech-to-text powered by Web Speech API
- 🔊 **Text-to-Speech** - AI responses read aloud with adjustable speed
- 📝 **Message Editing** - Edit your sent messages anytime
- 🗑️ **Message Deletion** - Remove unwanted messages
- 📌 **Pin Messages** - Keep important messages at the top
- 😊 **Emoji Reactions** - React to messages with emojis
- 🔍 **Search** - Find messages by keywords
- 💾 **Export/Import** - Export chats as TXT/JSON and import them back

### Advanced Features
- 🌙 **Dark Mode** - Beautiful dark theme toggle
- 💬 **Multiple Conversations** - Manage multiple chat histories simultaneously
- 📊 **Chat Statistics** - View message counts and total characters
- ⚙️ **Advanced Settings** - Customize username, voice speed, language, theme
- 🔑 **API Configuration** - Setup Google Generative AI API keys
- 💾 **Auto-save** - Automatically save conversations to localStorage
- ↗️ **Fullscreen Mode** - Expand chat for immersive experience
- 🎯 **Quick Replies** - One-click suggested responses

### AI Features
- 🤖 **Google Generative AI Integration** - Uses Gemini Pro model
- 📚 **Conversation Context** - Maintains message history for better responses
- ⏳ **Typing Indicators** - Visual feedback while bot is responding
- 🔄 **Demo Mode** - Pattern-based responses when API unavailable

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google API Key (optional, for real AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-chatbot
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

1. **Setup Google Generative AI (Optional)**
   - Get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a `.env` file in the backend directory:
     ```bash
     cp .env.example .env
     ```
   - Add your API key:
     ```
     GOOGLE_API_KEY=your_api_key_here
     PORT=5000
     ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The server will run on `http://localhost:5000`

3. **Start Frontend (in a new terminal)**
   ```bash
   cd frontend
   npm start
   ```
   The app will open at `http://localhost:3000`

## 📖 Usage Guide

### Chat Features
- **Type a Message**: Use the input box at the bottom to send messages
- **Voice Input**: Click the 🎤 button to start voice input
- **Edit Message**: Hover over your message and click ✏️ to edit
- **Delete Message**: Hover over your message and click 🗑️ to delete
- **Pin Message**: Click 📌 to pin important messages
- **Add Reaction**: Click 😊 to add emoji reactions

### Advanced Features
- **Search Messages**: Use the search box in the header to filter messages
- **Export Chat**: Click 💾 dropdown to export as TXT or JSON
- **Import Chat**: Click 📂 and select a chat file to import
- **View Stats**: Click 📊 to see conversation statistics
- **Fullscreen**: Click ↗️ to expand to fullscreen
- **Settings**: Click ⚙️ to access all settings

### Settings
- **Profile**: Set your display name
- **Voice & Audio**: Adjust voice speed and notifications
- **Display**: Change language and theme
- **Chat Settings**: Enable auto-save and set message limits
- **API Configuration**: Add your Google API key for real AI responses

## 🎨 Customization

### Themes
- Light Mode (default)
- Dark Mode
- Auto (follows system preference)

### Languages Supported
- English
- Spanish
- French
- German
- Chinese
- Japanese

### Configuration Options
- Voice speed: 0.5x - 2x
- Message history limit: Unlimited or custom
- Auto-save conversations
- Enable/disable notifications

## 🔧 Architecture

### Backend
- **Framework**: Express.js
- **AI**: Google Generative AI (Gemini Pro)
- **Features**: Conversation history tracking, session management

### Frontend
- **Framework**: React 19
- **Icons**: Pure emoji-based UI
- **Storage**: localStorage for data persistence
- **APIs**: Web Speech API, Speech Synthesis API

## 📁 Project Structure
```
ai-chatbot/
├── backend/
│   ├── server.js           # Main server file
│   ├── models/             # Data models
│   ├── routes/             # API routes
│   ├── package.json
│   └── .env               # Configuration (create from .env.example)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.js
│   │   │   ├── Message.js
│   │   │   └── Sidebar.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🔐 Security Notes
- Your API key is stored locally in your browser's localStorage
- No data is sent to external servers (except Google AI requests)
- Conversations are saved locally and not stored on any server
- Always use HTTPS in production

## 🐛 Troubleshooting

### "Cannot connect to server"
- Make sure backend is running on port 5000
- Check if Node.js error in terminal
- Verify API key is correctly set in `.env`

### Voice input not working
- Check browser support (Chrome, Edge, Safari)
- Allow microphone permissions
- Ensure HTTPS in production

### AI responses are generic
- Check if Google API key is set correctly
- Verify API key has Generative AI API enabled
- Check your Google Cloud project quota

### Slow responses
- Check internet connection
- Verify API quota hasn't been exceeded
- Clear browser cache and localStorage

## 📝 License
This project is open source and available under the MIT License.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit issues and pull requests.

## 🎓 Learning Resources
- [Google Generative AI Docs](https://ai.google.dev/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Web Speech API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

---

**Made with ❤️ for better conversations**


Updated by Swati