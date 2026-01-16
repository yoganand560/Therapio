/**
 * Therapio Authentication System
 * Works immediately without any external configuration
 * Uses localStorage for data persistence
 */

class TherapioAuth {
  constructor() {
    this.USERS_KEY = 'therapio_users';
    this.CURRENT_USER_KEY = 'therapio_current_user';
    this.SESSIONS_KEY = 'therapio_sessions';
    this.initializeStorage();
  }

  // Initialize storage if not exists
  initializeStorage() {
    if (!localStorage.getItem(this.USERS_KEY)) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify({}));
    }
    if (!localStorage.getItem(this.SESSIONS_KEY)) {
      localStorage.setItem(this.SESSIONS_KEY, JSON.stringify({}));
    }
  }

  // Generate unique user ID
  generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Hash password (simple for demo - in production use proper hashing)
  hashPassword(password) {
    // Simple hash for demo purposes
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  }

  // Get all users
  getAllUsers() {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '{}');
  }

  // Save all users
  saveAllUsers(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  // Register new user with email/password
  register(name, email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const users = this.getAllUsers();
          
          // Check if email already exists
          const existingUser = Object.values(users).find(u => u.email === email);
          if (existingUser) {
            reject({ code: 'email-already-in-use', message: 'This email is already registered' });
            return;
          }

          // Validate inputs
          if (!name || name.trim().length < 2) {
            reject({ code: 'invalid-name', message: 'Name must be at least 2 characters' });
            return;
          }

          if (!this.isValidEmail(email)) {
            reject({ code: 'invalid-email', message: 'Please enter a valid email address' });
            return;
          }

          if (password.length < 6) {
            reject({ code: 'weak-password', message: 'Password must be at least 6 characters' });
            return;
          }

          // Create new user
          const userId = this.generateUserId();
          const hashedPassword = this.hashPassword(password);
          const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10b981&color=fff&size=200`;

          const newUser = {
            uid: userId,
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            avatar: avatarUrl,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            authProvider: 'email',
            preferences: {
              notifications: true,
              theme: 'light',
              emailUpdates: true
            },
            stats: {
              totalSessions: 0,
              totalMessages: 0,
              moodEntries: 0,
              daysActive: 1
            },
            chatHistory: [],
            moodTracker: [],
            sessions: []
          };

          users[userId] = newUser;
          this.saveAllUsers(users);

          // Set as current user (auto-login)
          this.setCurrentUser(newUser);

          resolve({
            uid: userId,
            name: newUser.name,
            email: newUser.email,
            avatar: newUser.avatar
          });

        } catch (error) {
          reject({ code: 'unknown-error', message: 'Registration failed: ' + error.message });
        }
      }, 500); // Simulate network delay
    });
  }

  // Login with email/password
  login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const users = this.getAllUsers();
          const hashedPassword = this.hashPassword(password);

          // Find user by email
          const user = Object.values(users).find(u => 
            u.email === email.toLowerCase().trim() && 
            u.password === hashedPassword
          );

          if (!user) {
            reject({ code: 'invalid-credentials', message: 'Invalid email or password' });
            return;
          }

          // Update last login
          user.lastLogin = new Date().toISOString();
          users[user.uid] = user;
          this.saveAllUsers(users);

          // Set as current user
          this.setCurrentUser(user);

          resolve({
            uid: user.uid,
            name: user.name,
            email: user.email,
            avatar: user.avatar
          });

        } catch (error) {
          reject({ code: 'unknown-error', message: 'Login failed: ' + error.message });
        }
      }, 500); // Simulate network delay
    });
  }

  // Social login (Google/Microsoft simulation)
  socialLogin(provider, userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const users = this.getAllUsers();
          
          // Check if user exists with this email
          let user = Object.values(users).find(u => u.email === userData.email);

          if (user) {
            // Existing user - login
            user.lastLogin = new Date().toISOString();
            users[user.uid] = user;
            this.saveAllUsers(users);
            this.setCurrentUser(user);
            
            resolve({
              uid: user.uid,
              name: user.name,
              email: user.email,
              avatar: user.avatar
            });
          } else {
            // New user - register
            const userId = this.generateUserId();
            const newUser = {
              uid: userId,
              name: userData.name,
              email: userData.email,
              password: null, // No password for social login
              avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=10b981&color=fff&size=200`,
              createdAt: new Date().toISOString(),
              lastLogin: new Date().toISOString(),
              authProvider: provider,
              preferences: {
                notifications: true,
                theme: 'light',
                emailUpdates: true
              },
              stats: {
                totalSessions: 0,
                totalMessages: 0,
                moodEntries: 0,
                daysActive: 1
              },
              chatHistory: [],
              moodTracker: [],
              sessions: []
            };

            users[userId] = newUser;
            this.saveAllUsers(users);
            this.setCurrentUser(newUser);

            resolve({
              uid: userId,
              name: newUser.name,
              email: newUser.email,
              avatar: newUser.avatar
            });
          }

        } catch (error) {
          reject({ code: 'unknown-error', message: 'Social login failed: ' + error.message });
        }
      }, 800); // Simulate network delay
    });
  }

  // Set current user
  setCurrentUser(user) {
    const sessionData = {
      uid: user.uid,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      loggedIn: true,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(sessionData));
  }

  // Get current user
  getCurrentUser() {
    const userData = localStorage.getItem(this.CURRENT_USER_KEY);
    if (!userData) return null;
    
    try {
      const session = JSON.parse(userData);
      if (session.loggedIn) {
        return session;
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  // Get full user data
  getUserData(uid) {
    const users = this.getAllUsers();
    return users[uid] || null;
  }

  // Update user data
  updateUserData(uid, updates) {
    const users = this.getAllUsers();
    if (users[uid]) {
      users[uid] = { ...users[uid], ...updates };
      this.saveAllUsers(users);
      
      // Update current session if it's the current user
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.uid === uid) {
        this.setCurrentUser(users[uid]);
      }
      return true;
    }
    return false;
  }

  // Logout
  logout() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  // Check if user is logged in
  isLoggedIn() {
    return this.getCurrentUser() !== null;
  }

  // Validate email
  isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Save chat message
  saveChatMessage(message) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;

    const users = this.getAllUsers();
    const user = users[currentUser.uid];
    
    if (user) {
      if (!user.chatHistory) user.chatHistory = [];
      
      user.chatHistory.push({
        id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        text: message.text,
        sender: message.sender,
        timestamp: new Date().toISOString(),
        model: message.model || 'gemini-pro'
      });

      // Update stats
      user.stats.totalMessages = (user.stats.totalMessages || 0) + 1;
      
      this.saveAllUsers(users);
      return true;
    }
    return false;
  }

  // Get chat history
  getChatHistory(limit = 50) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return [];

    const users = this.getAllUsers();
    const user = users[currentUser.uid];
    
    if (user && user.chatHistory) {
      return user.chatHistory.slice(-limit);
    }
    return [];
  }

  // Clear chat history
  clearChatHistory() {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;

    const users = this.getAllUsers();
    const user = users[currentUser.uid];
    
    if (user) {
      user.chatHistory = [];
      this.saveAllUsers(users);
      return true;
    }
    return false;
  }

  // Save mood entry
  saveMoodEntry(moodData) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;

    const users = this.getAllUsers();
    const user = users[currentUser.uid];
    
    if (user) {
      if (!user.moodTracker) user.moodTracker = [];
      
      user.moodTracker.push({
        id: 'mood_' + Date.now(),
        mood: moodData.mood,
        intensity: moodData.intensity,
        notes: moodData.notes || '',
        timestamp: new Date().toISOString()
      });

      user.stats.moodEntries = (user.stats.moodEntries || 0) + 1;
      
      this.saveAllUsers(users);
      return true;
    }
    return false;
  }

  // Get mood history
  getMoodHistory(days = 30) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return [];

    const users = this.getAllUsers();
    const user = users[currentUser.uid];
    
    if (user && user.moodTracker) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      return user.moodTracker.filter(entry => 
        new Date(entry.timestamp) >= cutoffDate
      );
    }
    return [];
  }

  // Create session
  createSession(sessionData) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;

    const users = this.getAllUsers();
    const user = users[currentUser.uid];
    
    if (user) {
      if (!user.sessions) user.sessions = [];
      
      const session = {
        id: 'session_' + Date.now(),
        type: sessionData.type,
        startTime: new Date().toISOString(),
        endTime: null,
        duration: 0,
        status: 'active'
      };
      
      user.sessions.push(session);
      user.stats.totalSessions = (user.stats.totalSessions || 0) + 1;
      
      this.saveAllUsers(users);
      return session.id;
    }
    return null;
  }

  // End session
  endSession(sessionId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;

    const users = this.getAllUsers();
    const user = users[currentUser.uid];
    
    if (user && user.sessions) {
      const session = user.sessions.find(s => s.id === sessionId);
      if (session) {
        session.endTime = new Date().toISOString();
        session.duration = Math.floor((new Date(session.endTime) - new Date(session.startTime)) / 1000);
        session.status = 'completed';
        
        this.saveAllUsers(users);
        return true;
      }
    }
    return false;
  }

  // Get user stats
  getUserStats() {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;

    const users = this.getAllUsers();
    const user = users[currentUser.uid];
    
    if (user) {
      return {
        totalMessages: user.chatHistory?.length || 0,
        totalSessions: user.sessions?.filter(s => s.status === 'completed').length || 0,
        moodEntries: user.moodTracker?.length || 0,
        daysActive: this.calculateDaysActive(user)
      };
    }
    return null;
  }

  // Calculate days active
  calculateDaysActive(user) {
    const createdDate = new Date(user.createdAt);
    const today = new Date();
    const diffTime = Math.abs(today - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  // Get recent activity
  getRecentActivity(limit = 10) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return [];

    const users = this.getAllUsers();
    const user = users[currentUser.uid];
    
    if (!user) return [];

    const activities = [];

    // Add chat messages
    if (user.chatHistory) {
      user.chatHistory.slice(-5).forEach(msg => {
        activities.push({
          type: 'message',
          description: msg.sender === 'user' ? 'You sent a message' : 'AI Assistant replied',
          timestamp: msg.timestamp
        });
      });
    }

    // Add mood entries
    if (user.moodTracker) {
      user.moodTracker.slice(-3).forEach(mood => {
        activities.push({
          type: 'mood',
          description: `Logged mood: ${mood.mood}`,
          timestamp: mood.timestamp
        });
      });
    }

    // Add sessions
    if (user.sessions) {
      user.sessions.slice(-3).forEach(session => {
        activities.push({
          type: 'session',
          description: `${session.type} session ${session.status}`,
          timestamp: session.startTime
        });
      });
    }

    // Sort by timestamp and limit
    return activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }

  // Update user profile
  updateProfile(updates) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      console.error('No user logged in');
      return false;
    }

    const users = this.getAllUsers();
    const user = users[currentUser.uid];

    if (!user) {
      console.error('User not found');
      return false;
    }

    // Update allowed fields
    if (updates.name) user.name = updates.name.trim();
    if (updates.avatar) user.avatar = updates.avatar;
    if (updates.bio !== undefined) user.bio = updates.bio;
    if (updates.phone !== undefined) user.phone = updates.phone;

    // Save changes
    this.saveAllUsers(users);

    // Update current session
    const session = {
      ...currentUser,
      name: user.name,
      avatar: user.avatar
    };
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(session));

    console.log('✅ Profile updated');
    return true;
  }

  // Change password
  changePassword(newPassword) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      console.error('No user logged in');
      return false;
    }

    if (newPassword.length < 6) {
      console.error('Password too short');
      return false;
    }

    const users = this.getAllUsers();
    const user = users[currentUser.uid];

    if (!user) {
      console.error('User not found');
      return false;
    }

    user.password = this.hashPassword(newPassword);
    this.saveAllUsers(users);

    console.log('✅ Password changed');
    return true;
  }

  // Link external account
  linkAccount(provider, email) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      console.error('No user logged in');
      return false;
    }

    const users = this.getAllUsers();
    const user = users[currentUser.uid];

    if (!user) {
      console.error('User not found');
      return false;
    }

    if (!user.linkedAccounts) {
      user.linkedAccounts = {};
    }

    user.linkedAccounts[provider] = {
      email: email,
      linkedAt: new Date().toISOString()
    };

    this.saveAllUsers(users);
    console.log(`✅ ${provider} account linked`);
    return true;
  }

  // Unlink external account
  unlinkAccount(provider) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      console.error('No user logged in');
      return false;
    }

    const users = this.getAllUsers();
    const user = users[currentUser.uid];

    if (!user) {
      console.error('User not found');
      return false;
    }

    if (user.linkedAccounts && user.linkedAccounts[provider]) {
      delete user.linkedAccounts[provider];
      this.saveAllUsers(users);
      console.log(`✅ ${provider} account unlinked`);
      return true;
    }

    return false;
  }
}

// Create global instance
const therapioAuth = new TherapioAuth();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TherapioAuth;
}
