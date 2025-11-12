# ⚡ Quick Firebase Setup (5 Minutes)

## Option 1: Interactive Setup Script (Easiest)

1. **Run the setup script:**
   ```bash
   node setup-firebase.js
   ```

2. **Follow the prompts** - it will ask for your Firebase config values

3. **Done!** Restart your dev server

---

## Option 2: Manual Setup

### Step 1: Get Your Firebase Config (2 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add Project"** → Name it `resume-reviewer` → Continue
3. **Enable Authentication:**
   - Click "Authentication" → "Get Started"
   - Go to "Sign-in method" tab
   - Enable "Email/Password" → Save
4. **Create Firestore:**
   - Click "Firestore Database" → "Create database"
   - Select "Start in test mode" → Choose location → Enable
5. **Get Config:**
   - Click ⚙️ (gear icon) → "Project settings"
   - Scroll to "Your apps" → Click `</>` (web icon)
   - Register app → Copy the `firebaseConfig` object

### Step 2: Update Your Code (1 minute)

Open `src/config/firebase.js` and replace with your values:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY_HERE",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

### Step 3: Test (1 minute)

1. Restart dev server: `npm run dev`
2. Go to `/signup`
3. Create a test account
4. ✅ Should work without errors!

---

## 🎯 What You Need

From Firebase Console, you need these 6 values:
- ✅ apiKey
- ✅ authDomain  
- ✅ projectId
- ✅ storageBucket
- ✅ messagingSenderId
- ✅ appId

---

## 🆘 Troubleshooting

**"api-key-not-valid" error?**
- Make sure you copied the ENTIRE config object
- Check for extra spaces or quotes
- Restart dev server after updating

**"Permission denied" error?**
- Make sure Firestore is in "test mode"
- Check Authentication is enabled

**Still having issues?**
- Check browser console for detailed errors
- See `FIREBASE_SETUP_GUIDE.md` for detailed instructions

---

## ✅ Checklist

- [ ] Firebase project created
- [ ] Authentication enabled (Email/Password)
- [ ] Firestore created (test mode)
- [ ] Config values copied
- [ ] `firebase.js` file updated
- [ ] Dev server restarted
- [ ] Test signup works!

---

**That's it!** Your app should now work with Firebase! 🎉

