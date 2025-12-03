# 🛑 Stop Server & Deploy

## Step 1: Stop the Dev Server

In your terminal where the dev server is running:

1. **Press:** `Ctrl + C` (or `Cmd + C` on Mac)
2. **Wait for:** The server to stop
3. **You should see:** The command prompt returns (you can type again)

---

## Step 2: Login to Firebase

Once the server is stopped, run:

```bash
firebase login
```

**What happens:**
- Opens your browser
- Sign in with Google
- Authorize Firebase CLI
- Terminal shows: "Success! Logged in as..."

---

## Step 3: Deploy

After login, run:

```bash
npm run deploy
```

**This will:**
- Build your app
- Deploy to Firebase Hosting
- Show your live URLs! 🎉

---

## 🌐 Your Live URLs

After deployment:
- `https://resume-reviewer-76284.web.app`
- `https://resume-reviewer-76284.firebaseapp.com`

---

## Quick Commands Summary

```bash
# 1. Stop server (in terminal with server running)
Ctrl + C

# 2. Login to Firebase
firebase login

# 3. Deploy
npm run deploy
```

---

**That's it! Your app will be live!** 🚀

