// Firebase Configuration
// Replace these values with your actual Firebase project credentials
// Get them from: https://console.firebase.google.com/

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "therapio-app.firebaseapp.com",
  projectId: "therapio-app",
  storageBucket: "therapio-app.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
let db, auth;

function initializeFirebase() {
  if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    auth = firebase.auth();
    console.log('Firebase initialized successfully');
    return true;
  } else {
    console.error('Firebase SDK not loaded');
    return false;
  }
}

// Database helper functions
const database = {
  // User Management
  async createUser(userId, userData) {
    try {
      await db.collection('users').doc(userId).set({
        ...userData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastActive: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, error };
    }
  },

  async getUser(userId) {
    try {
      const doc = await db.collection('users').doc(userId).get();
      return doc.exists ? { success: true, data: doc.data() } : { success: false };
    } catch (error) {
      console.error('Error getting user:', error);
      return { success: false, error };
    }
  },

  async updateUser(userId, updates) {
    try {
      await db.collection('users').doc(userId).update({
        ...updates,
        lastActive: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error };
    }
  },

  // Chat History
  async saveChatMessage(userId, message) {
    try {
      await db.collection('users').doc(userId).collection('chatHistory').add({
        message: message.text,
        sender: message.sender, // 'user' or 'assistant'
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        model: 'gemini-pro'
      });
      return { success: true };
    } catch (error) {
      console.error('Error saving message:', error);
      return { success: false, error };
    }
  },

  async getChatHistory(userId, limit = 50) {
    try {
      const snapshot = await db.collection('users')
        .doc(userId)
        .collection('chatHistory')
        .orderBy('timestamp', 'desc')
        .limit(limit)
        .get();
      
      const messages = [];
      snapshot.forEach(doc => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, data: messages.reverse() };
    } catch (error) {
      console.error('Error getting chat history:', error);
      return { success: false, error };
    }
  },

  async clearChatHistory(userId) {
    try {
      const batch = db.batch();
      const snapshot = await db.collection('users')
        .doc(userId)
        .collection('chatHistory')
        .get();
      
      snapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
      return { success: true };
    } catch (error) {
      console.error('Error clearing chat history:', error);
      return { success: false, error };
    }
  },

  // Mood Tracking
  async saveMoodEntry(userId, moodData) {
    try {
      await db.collection('users').doc(userId).collection('moodTracker').add({
        mood: moodData.mood,
        intensity: moodData.intensity,
        notes: moodData.notes || '',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error saving mood entry:', error);
      return { success: false, error };
    }
  },

  async getMoodHistory(userId, days = 30) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      const snapshot = await db.collection('users')
        .doc(userId)
        .collection('moodTracker')
        .where('timestamp', '>=', cutoffDate)
        .orderBy('timestamp', 'desc')
        .get();
      
      const moods = [];
      snapshot.forEach(doc => {
        moods.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, data: moods };
    } catch (error) {
      console.error('Error getting mood history:', error);
      return { success: false, error };
    }
  },

  // Session Management
  async createSession(userId, sessionData) {
    try {
      const sessionRef = await db.collection('users')
        .doc(userId)
        .collection('sessions')
        .add({
          type: sessionData.type, // 'therapy', 'ai-chat', 'meditation'
          startTime: firebase.firestore.FieldValue.serverTimestamp(),
          endTime: null,
          duration: 0,
          status: 'active'
        });
      return { success: true, sessionId: sessionRef.id };
    } catch (error) {
      console.error('Error creating session:', error);
      return { success: false, error };
    }
  },

  async endSession(userId, sessionId, duration) {
    try {
      await db.collection('users')
        .doc(userId)
        .collection('sessions')
        .doc(sessionId)
        .update({
          endTime: firebase.firestore.FieldValue.serverTimestamp(),
          duration: duration,
          status: 'completed'
        });
      return { success: true };
    } catch (error) {
      console.error('Error ending session:', error);
      return { success: false, error };
    }
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { firebaseConfig, initializeFirebase, database };
}
