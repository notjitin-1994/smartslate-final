// src/lib/services/firebase.ts

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// IMPORTANT: Populate these with your actual Firebase project credentials in a .env file in the 'frontend' directory.
// Example .env.local file:
// VITE_FIREBASE_API_KEY="your-api-key"
// VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
// VITE_FIREBASE_PROJECT_ID="your-project-id"
// VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
// VITE_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
// VITE_FIREBASE_APP_ID="your-app-id"

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
// We add a check to see if the app is already initialized to prevent errors during hot-reloading in development.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export { app };
// Export the necessary Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

// --- Function Exports ---
// We create reusable function callers here to ensure consistency.
export { signInWithCustomToken };

// --- Firestore Functions ---

