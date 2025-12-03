// Firebase Configuration
// Configured with your Firebase project credentials
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiwPHqnLyffda0T5NF2x-5qjADPcrzjvE",
  authDomain: "resume-reviewer-76284.firebaseapp.com",
  projectId: "resume-reviewer-76284",
  storageBucket: "resume-reviewer-76284.firebasestorage.app",
  messagingSenderId: "1065066303533",
  appId: "1:1065066303533:web:4a7883b7a7fc57d22068a4",
  measurementId: "G-QTX9MTG9K2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export { analytics };

export default app;

