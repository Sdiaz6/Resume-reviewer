# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Project milestones:
-Sept 20–24: Set up project structure and basic UI for uploading a resume (React).
-Sept 25–Oct 1: Connect frontend to backend; upload resumes and extract text with Python.
-Oct 2–8: Add grammar checking and job description matching; start basic scoring system.
-Oct 9–15: Build final scoring system and show results on the frontend with simple charts or highlights.
-Oct 16–22: Test everything, fix bugs, polish UI, and prepare final version.

We are starting small and will add more features later...

Install guide - Resume Rater

-🌸 Resume Rater - Complete Setup Guide

## 📁 File Structure

Your project should be organized like this:

```
project-root/
├── backend/
│   ├── main.py                    (Backend API - UPDATED)
│   ├── .env                       (API keys - keep private!)
│   └── requirements.txt           (Python dependencies)
│
├── frontend/
│   ├── src/
│   │   ├
│   │   │ 
│   │   │          
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx          
│   │   │   ├── About.jsx        
│   │   │   └── ResumeRater.jsx   
│   │   │   └── Footer.jsx 
│   │   ├── utils/ 
         └──App.jsx               (Main app component)
│   │    └── main.jsx              (Entry point)
│   │    └── App.css
│   └── package.json
```

## 💻 Step-by-Step Setup

### Backend Setup:

```bash
# 1. Navigate to backend folder
cd backend

# 2. Install Python dependencies
pip install -r requirements.txt

# 3. Make sure .env file has your API key
# Should contain: OPENAI_API_KEY=your_key_here

# 4. Run the backend server
python main.py

# Backend should now be running on http://127.0.0.1:8000
```

### Frontend Setup:

```bash
# 1. Navigate to frontend folder
cd frontend

# 2. Install required packages
npm install lucide-react react-router-dom

# 3. Run the development server
npm run dev

# Frontend should now be running on http://localhost:5173
```

---
## 🐛 Troubleshooting

### Problem: "Failed to fetch" error
**Solution:** Make sure backend is running on port 8000

### Problem: No results showing
**Solution:** Check that you have OpenAI API credits ($5 minimum recommended)

### Problem: Styling looks broken
**Solution:** Make sure Tailwind CSS is configured and lucide-react is installed

---
## 💰 Cost Estimate

Using GPT-3.5-turbo:
- ~$0.01-0.02 per resume analysis
- $5 = approximately 250-500 analyses
- Monitor usage at: https://platform.openai.com/account/usage

