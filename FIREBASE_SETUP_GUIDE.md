# 🔥 Firebase Setup Guide - Step by Step

## Quick Setup (5 minutes)

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add Project"** or **"Create a project"**
3. Enter project name: `resume-reviewer` (or any name you prefer)
4. Click **Continue**
5. **Disable Google Analytics** (optional - you can enable later if needed)
6. Click **Create Project**
7. Wait for project creation (about 30 seconds)
8. Click **Continue**

---

### Step 2: Enable Authentication

1. In the left sidebar, click **"Authentication"**
2. Click **"Get Started"**
3. Click on the **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. Toggle **"Enable"** to ON
6. Click **"Save"**

**Optional - Enable Google Sign-in:**
7. Click on **"Google"**
8. Toggle **"Enable"** to ON
9. Enter a project support email (your email)
10. Click **"Save"**

---

### Step 3: Create Firestore Database

1. In the left sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
4. Click **Next**
5. Choose a location (select closest to you, e.g., `us-central` or `us-east1`)
6. Click **Enable**

**⚠️ Important:** Test mode allows read/write for 30 days. For production, you'll need to set up security rules later.

---

### Step 4: Get Your Firebase Config

1. Click the **gear icon (⚙️)** next to "Project Overview" in the left sidebar
2. Scroll down to **"Your apps"** section
3. If you don't see a web app, click the **`</>` (web)** icon
4. Register your app:
   - App nickname: `Resume Reviewer Web`
   - (Optional) Check "Also set up Firebase Hosting"
   - Click **"Register app"**
5. **Copy the `firebaseConfig` object** - it looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

---

### Step 5: Update Your Code

1. Open `src/config/firebase.js` in your project
2. Replace the placeholder values with your actual config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

3. Save the file
4. Restart your dev server (`npm run dev`)

---

## ✅ Verification

After setup, test:
1. Go to `/signup` page
2. Create a test account
3. You should be able to sign up without errors
4. Try logging in at `/login`

---

## 🔒 Security Rules (For Later - Production)

When you're ready for production, update Firestore rules:

1. Go to **Firestore Database** > **Rules**
2. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Resumes: users can read/write their own, or read public ones
    match /resumes/{resumeId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || resource.data.isPublic == true);
      allow write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

3. Click **"Publish"**

---

## 🆘 Troubleshooting

**Error: "api-key-not-valid"**
- Make sure you copied the entire config object
- Check that there are no extra spaces or quotes
- Restart your dev server after updating

**Error: "Permission denied"**
- Make sure Firestore is in "test mode" for development
- Check that Authentication is enabled

**Google Sign-in not working**
- Make sure you enabled Google in Authentication
- Check that you entered a support email

---

## 📝 Quick Checklist

- [ ] Firebase project created
- [ ] Authentication enabled (Email/Password)
- [ ] Firestore database created (test mode)
- [ ] Firebase config copied
- [ ] `firebase.js` file updated
- [ ] Dev server restarted
- [ ] Test signup works
- [ ] Test login works

---

**Need help?** Check the Firebase documentation or the error messages in your browser console.

