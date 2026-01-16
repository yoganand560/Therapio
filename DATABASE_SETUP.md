# Therapio Database Setup Guide

## Firebase Configuration

Therapio uses **Firebase Firestore** as its database solution for storing:
- User profiles
- Chat history
- Mood tracking data
- Session information

## Setup Instructions

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name your project: `therapio-app` (or your preferred name)
4. Follow the setup wizard (disable Google Analytics if not needed)

### 2. Enable Firestore Database

1. In your Firebase project, go to **Build** → **Firestore Database**
2. Click **Create Database**
3. Start in **Test mode** (for development) or **Production mode** (for live)
4. Choose your Firestore location (preferably close to your users)

### 3. Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon `</>`
4. Register your app with a nickname (e.g., "Therapio Web")
5. Copy the `firebaseConfig` object

### 4. Update Configuration File

Open `firebase-config.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### 5. Set Firestore Security Rules

In Firebase Console → Firestore Database → Rules, use these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Chat history subcollection
      match /chatHistory/{messageId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      // Mood tracker subcollection
      match /moodTracker/{moodId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      // Sessions subcollection
      match /sessions/{sessionId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

**Note:** For development/testing, you can temporarily use open rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
⚠️ **Remember to secure your rules before going to production!**

## Database Schema

### Users Collection
```
users/{userId}
  - email: string
  - name: string
  - createdAt: timestamp
  - lastActive: timestamp
```

### Chat History Subcollection
```
users/{userId}/chatHistory/{messageId}
  - message: string
  - sender: string ('user' | 'assistant')
  - timestamp: timestamp
  - model: string
```

### Mood Tracker Subcollection
```
users/{userId}/moodTracker/{moodId}
  - mood: string
  - intensity: number (1-10)
  - notes: string
  - timestamp: timestamp
```

### Sessions Subcollection
```
users/{userId}/sessions/{sessionId}
  - type: string ('therapy' | 'ai-chat' | 'meditation')
  - startTime: timestamp
  - endTime: timestamp
  - duration: number (seconds)
  - status: string ('active' | 'completed')
```

## Features Enabled by Database

✅ **Chat History Persistence** - Users can see previous conversations
✅ **Clear Chat Function** - Users can delete their chat history
✅ **User Tracking** - Anonymous user IDs for session management
✅ **Mood Tracking** - Store and retrieve mood entries over time
✅ **Session Analytics** - Track user engagement and usage patterns

## Testing the Database

1. Open `ai-assistant.html` in your browser
2. Send a message to the AI assistant
3. Check Firebase Console → Firestore Database
4. You should see a new document created under `users/{userId}/chatHistory/`

## Troubleshooting

### Firebase not loading
- Check browser console for errors
- Ensure Firebase SDK scripts are loading correctly
- Verify your internet connection

### Permission denied errors
- Check Firestore security rules
- Ensure user ID is being generated correctly
- For testing, temporarily use open rules (see above)

### Chat history not loading
- Check browser console for errors
- Verify Firebase configuration is correct
- Check if `firebase-config.js` is being loaded

## Next Steps

1. Enable Firebase Authentication for real user accounts
2. Add user registration/login functionality
3. Implement data encryption for sensitive information
4. Set up Firebase Cloud Functions for server-side processing
5. Add analytics tracking

## Support

For issues or questions about the database setup, check:
- [Firebase Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Console](https://console.firebase.google.com/)
