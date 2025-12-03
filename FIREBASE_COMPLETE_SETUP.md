# 🔥 Complete Firebase Setup Guide

## ✅ Current Status

Your Firebase project is configured with:
- ✅ Project ID: `resume-reviewer-76284`
- ✅ Firebase config file: `src/config/firebase.js`
- ✅ Firebase package installed: `firebase@12.6.0`

## 🚀 Required Setup Steps in Firebase Console

### Step 1: Enable Authentication (Email/Password)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **resume-reviewer-76284**
3. Click **"Authentication"** in the left sidebar
4. Click **"Get Started"** (if you haven't already)
5. Click on the **"Sign-in method"** tab
6. Find **"Email/Password"** in the list
7. Click on it, then toggle **"Enable"** to **ON**
8. Click **"Save"**

### Step 2: Enable Google Sign-in

1. Still in **Authentication > Sign-in method**
2. Find **"Google"** in the list
3. Click on it
4. Toggle **"Enable"** to **ON**
5. Enter a **Project support email** (your email address)
6. Click **"Save"**

### Step 3: Create Firestore Database

1. Click **"Firestore Database"** in the left sidebar
2. Click **"Create database"** (if you haven't already)
3. Select **"Start in test mode"** (for development)
4. Click **Next**
5. Choose a location (e.g., `us-central1` or closest to you)
6. Click **Enable**

**⚠️ Important:** Test mode allows read/write for 30 days. For production, you'll need to set up security rules later.

### Step 4: Verify Your Setup

After completing the above steps, your Firebase Console should show:

- ✅ **Authentication**: Email/Password and Google enabled
- ✅ **Firestore Database**: Created and running
- ✅ **Project Settings**: Your web app registered

## 🧪 Test Your Setup

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Test Email/Password Signup:**
   - Go to `http://localhost:5173/signup`
   - Enter your name, email, and password
   - Click "Sign Up"
   - Should work without errors ✅

3. **Test Google Sign-in:**
   - Go to `http://localhost:5173/login`
   - Click "Sign in with Google"
   - Should open Google sign-in popup ✅

4. **Test Login:**
   - Go to `http://localhost:5173/login`
   - Enter your email and password
   - Click "Sign In"
   - Should redirect to home page ✅

## 🐛 Troubleshooting

### Error: "auth/configuration-not-found"
**Solution:** Google Sign-in is not enabled. Follow Step 2 above.

### Error: "api-key-not-valid"
**Solution:** 
- Check that your Firebase config in `src/config/firebase.js` matches your Firebase Console
- Restart your dev server after making changes

### Error: "Permission denied" when accessing Firestore
**Solution:** 
- Make sure Firestore is in "test mode" (Step 3)
- Check that Authentication is enabled (Step 1)

### Google Sign-in popup blocked
**Solution:** 
- Allow popups for `localhost:5173` in your browser settings
- Try using a different browser

## 📋 Quick Checklist

Before deploying, make sure:

- [ ] Email/Password authentication enabled
- [ ] Google Sign-in enabled
- [ ] Firestore database created (test mode)
- [ ] Test signup works
- [ ] Test login works
- [ ] Test Google sign-in works

## 🚀 Ready to Deploy?

Once everything is tested locally:

1. **Login to Firebase:**
   ```bash
   firebase login
   ```

2. **Build and Deploy:**
   ```bash
   npm run deploy
   ```

Your app will be live at:
- `https://resume-reviewer-76284.web.app`
- `https://resume-reviewer-76284.firebaseapp.com`

## 📚 Additional Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firestore Docs](https://firebase.google.com/docs/firestore)
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)

---

**Need help?** Check the error messages in your browser console for specific error codes.

