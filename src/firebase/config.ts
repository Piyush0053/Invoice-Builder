import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let firebaseApp;
let analytics;

// Initialize Firebase only once
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
  
  // Initialize Analytics only in client-side and if supported
  if (typeof window !== 'undefined') {
    isSupported().then(yes => yes && (analytics = getAnalytics(firebaseApp)));
  }
}

const auth = getAuth();
const db = getFirestore();
const googleProvider = new GoogleAuthProvider();

export { analytics };

export { auth, db, googleProvider };
