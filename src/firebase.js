// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGU2qlwJsc8T4e1zoSnZ42NLUYreIlrLA",
  authDomain: "worksocial-portal.firebaseapp.com",
  projectId: "worksocial-portal",
  storageBucket: "worksocial-portal.appspot.com",
  messagingSenderId: "545836462131",
  appId: "1:545836462131:web:8cf34c6f903fd8f3a57346",
  measurementId: "G-DS6QTYLTWR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
}

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
export { app, auth };
