# 🔖 Quick Reference Guide

## File Locations & What They Do

### Backend
```
backend/
├── server.js          → Main Express server with AI integration
├── package.json       → Dependencies (Google AI, Express, CORS, dotenv)
├── .env              → Configuration (GOOGLE_API_KEY, PORT)
└── .env.example      → Template for .env file
```

### Frontend
```
frontend/
├── src/
│   ├── App.js       → Main app & Settings Panel
│   ├── App.css      → All styling including new features
│   ├── index.js     → Entry point
│   └── components/
│       ├── ChatWindow.js    → Chat interface with all features
│       ├── Message.js       → Individual message display
│       └── Sidebar.js       → Navigation & user info
└── package.json     → React dependencies
```

---

## Common Tasks & Where to Do Them

### ❓ "How do I add a new button?"
**File:** `frontend/src/components/ChatWindow.js`
- Find the JSX return section
- Add button element with className
- Add function to handle click
- Style in `App.css` using the className

### ❓ "How do I change colors?"
**File:** `frontend/src/App.css`
- Search for the component you want to change
- Modify the `background`, `color`, or `border` properties
- Change gradient colors (e.g., `#667eea` to your color)

### ❓ "How do I add a new API endpoint?"
**File:** `backend/server.js`
- Add new `app.post()` or `app.get()` route
- Implement the logic
- Send response with `res.json()`

### ❓ "How do I modify AI behavior?"
**File:** `backend/server.js`
- Modify `generationConfig` in the model creation
- Change `temperature` (0-1, lower = more focused)
- Change `maxOutputTokens` for response length
- Or tweak the `generateDemoResponse()` function

### ❓ "How do I add new settings?"
**File 1:** `frontend/src/App.js`
- Add new property to initial `userSettings` state
- Create new setting item in `SettingsPanel` JSX

**File 2:** `frontend/src/components/ChatWindow.js` (if needed)
- Use the setting from `voiceSpeed` as example

---

## Styling Quick Reference

### Common Classes
```css
.chat-window           → Main chat container
.message               → Individual message
.settings-panel       → Settings modal
.button               → Any button
.icon-btn            → Icon buttons (small)
.chat-window.dark    → Dark mode variant
```

### Adding Dark Mode Support
```css
/* Light mode */
.my-component {
  background: white;
  color: #000;
}

/* Dark mode */
.chat-window.dark .my-component {
  background: #2d2d44;
  color: #fff;
}
```

### Colors Used
```
Primary: #667eea (purple)
Secondary: #764ba2 (dark purple)
Success: #4caf50 (green)
Danger: #ff4444 (red)
Warning: #ffd700 (gold)
```

---

## State Management Patterns

### Add New Message State
```javascript
const [messages, setMessages] = useState([]);

// Add message
setMessages(prev => [...prev, newMessage]);

// Update message
setMessages(messages.map(m => 
  m.id === targetId ? {...m, ...updates} : m
));

// Delete message
setMessages(messages.filter(m => m.id !== targetId));
```

### Add New Setting
```javascript
// In App.js initial state
const [userSettings, setUserSettings] = useState({
  // ... existing settings
  newSetting: defaultValue
});

// Update
onUpdate({...userSettings, newSetting: newValue})
```

---

## Common Code Patterns

### Message Object Structure
```javascript
{
  id: Date.now(),              // Unique ID
  sender: "user" or "bot",     // Who sent it
  text: "Message content",     // Message text
  reactions: {},               // {emoji: count}
  timestamp: new Date(),       // When sent
  pinned: false,              // Is pinned?
  edited: false               // Was edited?
}
```

### API Call Pattern
```javascript
try {
  const res = await axios.post("http://localhost:5000/chat", {
    message: userMessage,
    sessionId: "chat-session"
  });
  
  const botReply = res.data.reply;
  setMessages(prev => [...prev, botMsg]);
} catch (error) {
  console.error("Error:", error);
  // Handle error
}
```

### localStorage Pattern
```javascript
// Save
localStorage.setItem("key", JSON.stringify(data));

// Load
const saved = localStorage.getItem("key");
return saved ? JSON.parse(saved) : defaultValue;
```

---

## Useful Browser APIs

### Speech Recognition
```javascript
const recognition = new window.webkitSpeechRecognition();
recognition.lang = "en-US";
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
};
recognition.start();
```

### Text-to-Speech
```javascript
const speech = new SpeechSynthesisUtterance(text);
speech.rate = 1;  // Speed
speech.pitch = 1; // Pitch
window.speechSynthesis.speak(speech);
```

### Copy to Clipboard
```javascript
navigator.clipboard.writeText(text);
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Enter | Send message |
| Shift+Enter | New line (when focused on input) |
| Ctrl+K / Cmd+K | Search (currently in UI) |
| Esc | Close modals |

---

## Debugging Tips

### Check Backend
1. Look for console logs in terminal where `npm start` is running
2. Check for errors in `server.js` console output
3. Verify `.env` file has `GOOGLE_API_KEY`
4. Test API with: `curl http://localhost:5000/health`

### Check Frontend
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for API calls
4. Check Application → localStorage for saved data

### Common Issues

**"Cannot connect to server"**
- Is backend running? (`npm start` in backend folder)
- Is it on port 5000? (Check `server.js`)

**Messages not saving**
- Check browser localStorage settings
- Try clearing cache and reloading

**AI giving generic responses**
- Did you add the Google API key?
- Is the key valid? (Get from makersuite.google.com)
- Check backend console for errors

**Styling not applying**
- Clear browser cache (Ctrl+Shift+R)
- Check if class name matches in HTML and CSS
- Check if `.dark` class is on parent for dark mode

---

## Performance Tips

### Optimize Component Rendering
```javascript
// Use useCallback to prevent re-renders
const handleClick = useCallback(() => {
  // handler code
}, [dependencies]);
```

### Lazy Load Settings
```javascript
// Don't load all data immediately
useEffect(() => {
  // Load expensive data
}, []);
```

### Limit Message History
```javascript
// Keep only last 100 messages
const recentMessages = messages.slice(-100);
```

---

## Testing Checklist

Before pushing changes:
- [ ] Backend starts without errors
- [ ] Frontend compiles without errors
- [ ] Can send/receive messages
- [ ] New feature works as expected
- [ ] Dark mode styling correct
- [ ] Responsive on mobile
- [ ] No console errors (F12)
- [ ] Data persists on refresh
- [ ] All buttons are clickable

---

## Useful Resources

### Documentation
- [React Hooks Docs](https://react.dev/reference/react)
- [Express.js Guide](https://expressjs.com/)
- [Google Generative AI Docs](https://ai.google.dev/)
- [Web APIs - MDN](https://developer.mozilla.org/en-US/docs/Web/API)

### Tools
- [color-hex.com](https://www.color-hex.com/) → Color picker
- [CSS Gradient](https://cssgradient.io/) → Gradient generator
- [localhost:3000](http://localhost:3000) → Frontend
- [localhost:5000](http://localhost:5000) → Backend/API

---

## Next Steps for Enhancement

### Easy Additions
- [ ] Add more emoji reactions
- [ ] Create chat templates
- [ ] Add message timestamps to export
- [ ] Create conversation folders
- [ ] Add message copy confirmation sound

### Medium Complexity
- [ ] Add user authentication
- [ ] Store chats in database
- [ ] Create conversation sharing
- [ ] Add message scheduling
- [ ] Implement typing sounds

### Advanced Features
- [ ] Add image upload and analysis
- [ ] Implement streaming responses
- [ ] Create conversation branching
- [ ] Add custom AI model selection
- [ ] Build collaborative editing

---

**Last Updated:** March 17, 2026
**Version:** 1.0 (Complete)
