// Example usage of Therapio database functions
// This file demonstrates how to use the database API

// Example 1: Save a user profile
async function exampleCreateUser() {
  const userId = 'user_123';
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    preferences: {
      notifications: true,
      theme: 'light'
    }
  };
  
  const result = await database.createUser(userId, userData);
  console.log('User created:', result);
}

// Example 2: Save a chat message
async function exampleSaveChatMessage() {
  const userId = 'user_123';
  const message = {
    text: 'I need help with anxiety',
    sender: 'user'
  };
  
  const result = await database.saveChatMessage(userId, message);
  console.log('Message saved:', result);
}

// Example 3: Get chat history
async function exampleGetChatHistory() {
  const userId = 'user_123';
  
  const result = await database.getChatHistory(userId, 20);
  if (result.success) {
    console.log('Chat history:', result.data);
    // Display messages
    result.data.forEach(msg => {
      console.log(`${msg.sender}: ${msg.message}`);
    });
  }
}

// Example 4: Save mood entry
async function exampleSaveMood() {
  const userId = 'user_123';
  const moodData = {
    mood: 'anxious',
    intensity: 7,
    notes: 'Worried about work deadline'
  };
  
  const result = await database.saveMoodEntry(userId, moodData);
  console.log('Mood saved:', result);
}

// Example 5: Get mood history
async function exampleGetMoodHistory() {
  const userId = 'user_123';
  
  const result = await database.getMoodHistory(userId, 30); // Last 30 days
  if (result.success) {
    console.log('Mood history:', result.data);
    
    // Calculate average mood intensity
    const avgIntensity = result.data.reduce((sum, m) => sum + m.intensity, 0) / result.data.length;
    console.log('Average mood intensity:', avgIntensity);
  }
}

// Example 6: Track a session
async function exampleTrackSession() {
  const userId = 'user_123';
  
  // Start session
  const sessionStart = await database.createSession(userId, { type: 'ai-chat' });
  console.log('Session started:', sessionStart.sessionId);
  
  // Simulate 5 minutes of chat
  setTimeout(async () => {
    // End session
    const duration = 300; // 5 minutes in seconds
    await database.endSession(userId, sessionStart.sessionId, duration);
    console.log('Session ended');
  }, 300000);
}

// Example 7: Complete workflow - New user chatting
async function completeWorkflowExample() {
  const userId = 'user_' + Math.random().toString(36).substr(2, 9);
  
  // 1. Create user
  await database.createUser(userId, {
    name: 'New User',
    email: 'newuser@example.com'
  });
  
  // 2. Start session
  const session = await database.createSession(userId, { type: 'ai-chat' });
  
  // 3. Save some messages
  await database.saveChatMessage(userId, {
    text: 'Hello, I need help',
    sender: 'user'
  });
  
  await database.saveChatMessage(userId, {
    text: 'Hello! I\'m here to help. What\'s on your mind?',
    sender: 'assistant'
  });
  
  // 4. Save mood
  await database.saveMoodEntry(userId, {
    mood: 'stressed',
    intensity: 6,
    notes: 'Feeling overwhelmed'
  });
  
  // 5. End session
  await database.endSession(userId, session.sessionId, 600);
  
  console.log('Complete workflow executed for user:', userId);
}

// Usage in your HTML pages:
/*
<script src="firebase-config.js"></script>
<script>
  // Initialize Firebase first
  initializeFirebase();
  
  // Then use database functions
  const userId = getCurrentUserId(); // Your function to get user ID
  
  // Save a message
  database.saveChatMessage(userId, {
    text: 'User message',
    sender: 'user'
  });
  
  // Load chat history
  database.getChatHistory(userId).then(result => {
    if (result.success) {
      displayMessages(result.data);
    }
  });
</script>
*/
