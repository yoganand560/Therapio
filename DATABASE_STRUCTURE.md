# Therapio Database Structure

## Firebase Firestore Collections & Subcollections

```
📦 Firestore Database
│
└── 👥 users (collection)
    │
    ├── 📄 {userId} (document)
    │   ├── name: string
    │   ├── email: string
    │   ├── createdAt: timestamp
    │   ├── lastActive: timestamp
    │   │
    │   ├── 💬 chatHistory (subcollection)
    │   │   └── 📄 {messageId}
    │   │       ├── message: string
    │   │       ├── sender: "user" | "assistant"
    │   │       ├── timestamp: timestamp
    │   │       └── model: "gemini-pro"
    │   │
    │   ├── 😊 moodTracker (subcollection)
    │   │   └── 📄 {moodId}
    │   │       ├── mood: string
    │   │       ├── intensity: number (1-10)
    │   │       ├── notes: string
    │   │       └── timestamp: timestamp
    │   │
    │   └── 🕐 sessions (subcollection)
    │       └── 📄 {sessionId}
    │           ├── type: "therapy" | "ai-chat" | "meditation"
    │           ├── startTime: timestamp
    │           ├── endTime: timestamp | null
    │           ├── duration: number (seconds)
    │           └── status: "active" | "completed"
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    User Interaction                      │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                 AI Assistant Page                        │
│  (ai-assistant.html + firebase-config.js)                │
└─────────────────────┬───────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
┌──────────────┐ ┌──────────┐ ┌────────────┐
│ Send Message │ │Load Chat │ │Clear Chat  │
│              │ │ History  │ │            │
└──────┬───────┘ └────┬─────┘ └─────┬──────┘
       │              │              │
       ▼              ▼              ▼
┌─────────────────────────────────────────────────────────┐
│              Firebase Database API                       │
│         (database.saveChatMessage, etc.)                 │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│              Firebase Firestore                          │
│         (Cloud-hosted NoSQL Database)                    │
└─────────────────────────────────────────────────────────┘
```

## API Functions Reference

### User Management
```javascript
database.createUser(userId, userData)
database.getUser(userId)
database.updateUser(userId, updates)
```

### Chat Management
```javascript
database.saveChatMessage(userId, message)
database.getChatHistory(userId, limit)
database.clearChatHistory(userId)
```

### Mood Tracking
```javascript
database.saveMoodEntry(userId, moodData)
database.getMoodHistory(userId, days)
```

### Session Management
```javascript
database.createSession(userId, sessionData)
database.endSession(userId, sessionId, duration)
```

## Integration Points

### 1. AI Assistant Page (ai-assistant.html)
- Saves every message to Firestore
- Loads previous chat history on page load
- Clear chat button deletes all messages
- Auto-generates anonymous user IDs

### 2. Login Page (login.html) - Future Enhancement
- Store user credentials securely
- Link sessions to authenticated users
- Sync data across devices

### 3. Index Page (index.html) - Future Enhancement
- Display user statistics
- Show recent activity
- Mood tracking dashboard

## Security Model

```
┌─────────────────────────────────────────────────────────┐
│                 Firebase Security Rules                  │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ✓ Users can only read/write their own data              │
│  ✓ User ID must match authenticated user                 │
│  ✓ Sensitive data encrypted at rest                      │
│  ✓ HTTPS only connections                                │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

## Performance Considerations

### Indexing
- `chatHistory` indexed by `timestamp` (descending)
- `moodTracker` indexed by `timestamp` (descending)
- `sessions` indexed by `startTime` (descending)

### Caching
- Chat history cached in browser
- Reduces database reads
- Updates only when new messages arrive

### Limits
- Free tier: 50K reads/day, 20K writes/day
- 1 GB storage included
- Perfect for small to medium apps

## Cost Estimation (Free Tier)

- **Reads**: 50,000/day → ~1,666 users viewing history/day
- **Writes**: 20,000/day → ~10,000 messages/day
- **Storage**: 1 GB → ~1 million messages

**Expected usage**: Well within free tier limits for initial launch!
