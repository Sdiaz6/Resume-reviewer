/**
 * Firebase Debugging Utility
 * Use this to check Firebase connection and configuration
 * 
 * Usage: Import and call checkFirebaseSetup() in your component
 */

import { auth, db } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

export const checkFirebaseSetup = async () => {
  console.group('🔍 Firebase Setup Check');
  
  // Check Firebase Config
  console.log('✅ Firebase Config:', {
    projectId: auth.app.options.projectId,
    authDomain: auth.app.options.authDomain,
  });

  // Check Auth State
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('✅ User is signed in:', {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        console.log('ℹ️ No user signed in');
      }

      // Check Firestore Connection
      try {
        const testCollection = collection(db, 'users');
        const snapshot = await getDocs(testCollection);
        console.log('✅ Firestore connection successful');
        console.log(`✅ Found ${snapshot.size} user document(s)`);
      } catch (error) {
        console.error('❌ Firestore connection failed:', error);
      }

      console.groupEnd();
      resolve();
    });
  });
};

// Auto-check on import (for development)
if (import.meta.env.DEV) {
  console.log('🔍 Firebase Debug Utility Loaded');
  console.log('💡 Call checkFirebaseSetup() in your component to verify setup');
}

