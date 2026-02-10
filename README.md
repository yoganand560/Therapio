




# Therapio - Mental Wellness Platform

![Therapio Banner](Therapio_Image_r1sa32r1sa32r1sa.png)

## 🧠 About Therapio

Therapio is a comprehensive mental wellness platform that connects people facing stress, anxiety, and depression with certified psychologists and provides a free AI mental health assistant powered by Google Gemini.

## ✨ Features

- **🤖 AI Mental Health Assistant** - 24/7 free emotional support and guidance using Google Gemini API
- **💬 Text Therapy** - Chat with licensed psychologists via secure messaging
- **📊 Mood Tracking** - Track and analyze your emotional wellness over time
- **🧘 Guided Mindfulness** - Meditation and breathing exercises
- **📚 Wellness Library** - Curated mental health resources
- **💾 Chat History** - Persistent conversation storage with Firebase
- **📱 Responsive Design** - Works seamlessly on desktop and mobile

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Firebase account (for database features)
- Google Gemini API key (already configured)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/the-elite-ways/Therapio.git
   cd Therapio
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html  # macOS
   start index.html # Windows
   xdg-open index.html # Linux
   ```

3. **Set up Firebase (for database features)**
   - See [DATABASE_SETUP.md](DATABASE_SETUP.md) for detailed instructions
   - Update `firebase-config.js` with your Firebase credentials

## 📁 Project Structure

```
Therapio/
├── index.html              # Main landing page
├── ai-assistant.html       # AI chat interface
├── login.html             # User authentication
├── about.html             # About page
├── firebase-config.js     # Firebase database configuration
├── database-examples.js   # Database usage examples
├── DATABASE_SETUP.md      # Database setup guide
├── DATABASE_STRUCTURE.md  # Database schema documentation
└── README.md             # This file
```

## 🗄️ Database

Therapio uses **Firebase Firestore** to store:
- User profiles and preferences
- Chat conversation history
- Mood tracking data
- Session analytics

**Key Features:**
- ✅ Persistent chat history across sessions
- ✅ Secure user data storage
- ✅ Real-time synchronization
- ✅ Clear chat functionality
- ✅ Anonymous user support

See [DATABASE_SETUP.md](DATABASE_SETUP.md) for setup instructions.

## 🔧 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **AI**: Google Gemini Pro API
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (coming soon)
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Inter)

## 🎨 Design

- Modern, clean interface with soothing green color scheme
- Fully responsive design for all screen sizes
- Smooth animations and transitions
- Accessibility-focused
- Professional medical-grade UI

## 📊 Database Schema

```
users/{userId}
  ├── chatHistory/{messageId}
  ├── moodTracker/{moodId}
  └── sessions/{sessionId}
```

See [DATABASE_STRUCTURE.md](DATABASE_STRUCTURE.md) for complete schema.

## 🔐 Security

- Firebase security rules protect user data
- HTTPS-only connections
- API keys managed securely
- User data encrypted at rest
- Privacy-focused design

## 📱 Pages

1. **Home (index.html)** - Landing page with features overview
2. **AI Assistant (ai-assistant.html)** - Chat interface with Gemini AI
3. **Login (login.html)** - User authentication
4. **About (about.html)** - Information about the platform

## 🌟 Key Functions

### Database API
```javascript
// Save a message
await database.saveChatMessage(userId, { text: "Hello", sender: "user" });

// Load chat history
const history = await database.getChatHistory(userId, 20);

// Clear chat
await database.clearChatHistory(userId);

// Track mood
await database.saveMoodEntry(userId, { mood: "happy", intensity: 8 });
```

## 🚧 Roadmap

- [x] AI Chat Assistant with Gemini
- [x] Firebase Database Integration
- [x] Chat History Persistence
- [ ] User Authentication System
- [ ] Therapist Booking System
- [ ] Video Call Integration
- [ ] Mobile Apps (iOS/Android)
- [ ] Mood Analytics Dashboard
- [ ] Meditation Timer
- [ ] Crisis Intervention Features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For help with:
- **Database Setup**: See [DATABASE_SETUP.md](DATABASE_SETUP.md)
- **Code Examples**: See [database-examples.js](database-examples.js)
- **Issues**: Open an issue on GitHub

## 👨‍💻 Developer

Created by [the-elite-ways](https://github.com/the-elite-ways)

## 🙏 Acknowledgments

- Google Gemini AI for powering the AI assistant
- Firebase for database infrastructure
- Font Awesome for icons
- Google Fonts for typography

---

**⚠️ Important Note**: This is a demonstration project. For actual mental health crises, please contact emergency services or a professional mental health provider immediately.

**Crisis Resources:**
- National Suicide Prevention Lifeline: 988
- Crisis Text Line: Text HOME to 741741
- International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/


## 🧠 About Therapio

Therapio is a comprehensive mental wellness platform that connects people facing stress, anxiety, and depression with certified psychologists and provides a free AI mental health assistant powered by Google Gemini.

## ✨ Features

- **🤖 AI Mental Health Assistant** - 24/7 free emotional support and guidance using Google Gemini API
- **💬 Text Therapy** - Chat with licensed psychologists via secure messaging
- **📊 Mood Tracking** - Track and analyze your emotional wellness over time
- **🧘 Guided Mindfulness** - Meditation and breathing exercises
- **📚 Wellness Library** - Curated mental health resources
- **💾 Chat History** - Persistent conversation storage with Firebase
- **📱 Responsive Design** - Works seamlessly on desktop and mobile

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Firebase account (for database features)
- Google Gemini API key (already configured)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/the-elite-ways/Therapio.git
   cd Therapio
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html  # macOS
   start index.html # Windows
   xdg-open index.html # Linux
   ```

3. **Set up Firebase (for database features)**
   - See [DATABASE_SETUP.md](DATABASE_SETUP.md) for detailed instructions
   - Update `firebase-config.js` with your Firebase credentials

## 📁 Project Structure

```
Therapio/
├── index.html              # Main landing page
├── ai-assistant.html       # AI chat interface
├── login.html             # User authentication
├── about.html             # About page
├── firebase-config.js     # Firebase database configuration
├── database-examples.js   # Database usage examples
├── DATABASE_SETUP.md      # Database setup guide
├── DATABASE_STRUCTURE.md  # Database schema documentation
└── README.md             # This file
```

## 🗄️ Database

Therapio uses **Firebase Firestore** to store:
- User profiles and preferences
- Chat conversation history
- Mood tracking data
- Session analytics

**Key Features:**
- ✅ Persistent chat history across sessions
- ✅ Secure user data storage
- ✅ Real-time synchronization
- ✅ Clear chat functionality
- ✅ Anonymous user support

See [DATABASE_SETUP.md](DATABASE_SETUP.md) for setup instructions.

## 🔧 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **AI**: Google Gemini Pro API
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (coming soon)
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Inter)

## 🎨 Design

- Modern, clean interface with soothing green color scheme
- Fully responsive design for all screen sizes
- Smooth animations and transitions
- Accessibility-focused
- Professional medical-grade UI

## 📊 Database Schema

```
users/{userId}
  ├── chatHistory/{messageId}
  ├── moodTracker/{moodId}
  └── sessions/{sessionId}
```

See [DATABASE_STRUCTURE.md](DATABASE_STRUCTURE.md) for complete schema.

## 🔐 Security

- Firebase security rules protect user data
- HTTPS-only connections
- API keys managed securely
- User data encrypted at rest
- Privacy-focused design

## 📱 Pages

1. **Home (index.html)** - Landing page with features overview
2. **AI Assistant (ai-assistant.html)** - Chat interface with Gemini AI
3. **Login (login.html)** - User authentication
4. **About (about.html)** - Information about the platform

## 🌟 Key Functions

### Database API
```javascript
// Save a message
await database.saveChatMessage(userId, { text: "Hello", sender: "user" });

// Load chat history
const history = await database.getChatHistory(userId, 20);

// Clear chat
await database.clearChatHistory(userId);

// Track mood
await database.saveMoodEntry(userId, { mood: "happy", intensity: 8 });
```

## 🚧 Roadmap

- [x] AI Chat Assistant with Gemini
- [x] Firebase Database Integration
- [x] Chat History Persistence
- [ ] User Authentication System
- [ ] Therapist Booking System
- [ ] Video Call Integration
- [ ] Mobile Apps (iOS/Android)
- [ ] Mood Analytics Dashboard
- [ ] Meditation Timer
- [ ] Crisis Intervention Features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For help with:
- **Database Setup**: See [DATABASE_SETUP.md](DATABASE_SETUP.md)
- **Code Examples**: See [database-examples.js](database-examples.js)
- **Issues**: Open an issue on GitHub

## 👨‍💻 Developer

Created by [the-elite-ways](https://github.com/the-elite-ways)

## 🙏 Acknowledgments

- Google Gemini AI for powering the AI assistant
- Firebase for database infrastructure
- Font Awesome for icons
- Google Fonts for typography

---

**⚠️ Important Note**: This is a demonstration project. For actual mental health crises, please contact emergency services or a professional mental health provider immediately.

**Crisis Resources:**
- National Suicide Prevention Lifeline: 988
- Crisis Text Line: Text HOME to 741741
- International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/






