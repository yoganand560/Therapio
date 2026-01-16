# 🔥 Firebase Setup Instructions for Therapio

## ⚠️ IMPORTANT: Registration Won't Work Until You Complete This Setup!

Your registration is not functioning because Firebase needs to be configured with your actual project credentials.

---

## 📋 Step-by-Step Setup (5 minutes)

### Step 1: Create a Firebase Project

1. Go to **[Firebase Console](https://console.firebase.google.com/)**
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `Therapio` (or any name you prefer)
4. Click **Continue**
5. Disable Google Analytics (optional, you can enable it later)
6. Click **Create project**
7. Wait for the project to be created, then click **Continue**

---

### Step 2: Register Your Web App

1. In the Firebase Console, click the **Web icon** (`</>`) to add a web app
2. Enter app nickname: `Therapio Web App`
3. **Check** the box for "Also set up Firebase Hosting" (optional)
4. Click **Register app**
5. **Copy the Firebase configuration code** that appears (it looks like this):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "therapio-xxxxx.firebaseapp.com",
  projectId: "therapio-xxxxx",
  storageBucket: "therapio-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

6. Click **Continue to console**

---

### Step 3: Enable Authentication Methods

1. In the left sidebar, click **Build** → **Authentication**
2. Click **Get started**
3. Go to the **Sign-in method** tab

#### Enable Email/Password:
- Click **Email/Password**
- Toggle **Enable** to ON
- Click **Save**

#### Enable Google Sign-In:
- Click **Google**
- Toggle **Enable** to ON
- Select a support email from the dropdown
- Click **Save**

#### Enable Microsoft Sign-In (Optional):
- Click **Microsoft**
- Toggle **Enable** to ON
- You'll need to create a Microsoft Azure app (Firebase provides instructions)
- Click **Save**

---

### Step 4: Set Up Firestore Database

1. In the left sidebar, click **Build** → **Firestore Database**
2. Click **Create database**
3. Select **Start in test mode** (for development)
   - ⚠️ Note: This allows anyone to read/write. Change to production mode later!
4. Choose a location closest to your users (e.g., `us-central1`)
5. Click **Enable**

#### Update Security Rules (Important for Production):
Once the database is created, go to the **Rules** tab and paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Allow reading and writing to subcollections
      match /{subcollection}/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

Click **Publish**

---

### Step 5: Update Your Code

1. Open **`firebase-config.js`** in your Therapio folder
2. Replace the placeholder values with your actual Firebase configuration:

**FIND THIS (lines 5-11):**
```javascript
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "therapio-app.firebaseapp.com",
  projectId: "therapio-app",
  storageBucket: "therapio-app.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

**REPLACE WITH** (your actual config from Step 2):
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",  // Your actual API key
  authDomain: "therapio-xxxxx.firebaseapp.com",  // Your actual domain
  projectId: "therapio-xxxxx",  // Your actual project ID
  storageBucket: "therapio-xxxxx.appspot.com",  // Your actual bucket
  messagingSenderId: "123456789",  // Your actual sender ID
  appId: "1:123456789:web:abcdef123456"  // Your actual app ID
};
```

3. **Save the file**

---

### Step 6: Test Your Registration

1. Open `login.html` in your browser
2. Click the **Register** tab
3. Fill in:
   - Full Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
   - Check "I agree to the Terms"
4. Click **Create Account**

✅ **Success**: You should see "Registration successful!" and be redirected to the dashboard

❌ **If it fails**: 
- Check browser console (F12 → Console) for errors
- Make sure you completed ALL steps above
- Verify your Firebase config is correct

---

### Step 7: Test Google Sign-In

1. Click **Continue with Google**
2. Select a Google account
3. You should be automatically logged in and redirected to dashboard

---

## 🎉 You're Done!

Your registration and login system should now be fully functional!

---

## 🔍 Troubleshooting

### Error: "Firebase not defined"
- **Solution**: Make sure you've updated `firebase-config.js` with real credentials

### Error: "Permission denied"
- **Solution**: Check Firestore security rules (Step 4)

### Error: "Invalid API key"
- **Solution**: Double-check that you copied the config correctly from Firebase Console

### Google Sign-In pop-up blocked
- **Solution**: Allow pop-ups for your website in browser settings

### "Email already in use"
- **Solution**: This email is already registered. Use the Login tab instead.

---

## 📞 Need Help?

1. Check Firebase Console → **Authentication** → **Users** tab to see registered users
2. Check Firebase Console → **Firestore Database** to see stored data
3. Open browser console (F12) to see detailed error messages

---

## 🚀 Next Steps After Setup

Once everything works:

1. **Deploy to Production**: Change Firestore rules to production mode
2. **Add Password Reset**: Implement forgot password functionality
3. **Email Verification**: Require users to verify their email
4. **Add More Providers**: Facebook, Twitter, Apple Sign-In

---

## ⚡ Quick Reference

| File | Purpose |
|------|---------|
| `firebase-config.js` | **UPDATE THIS** with your Firebase credentials |
| `login.html` | Registration and login page |
| `dashboard.html` | User dashboard after login |
| `ai-assistant.html` | AI chat with user-specific history |

---

**Last Updated**: January 17, 2026
