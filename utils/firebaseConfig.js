// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-course-generator-40f0c.firebaseapp.com",
  projectId: "ai-course-generator-40f0c",
  storageBucket: "ai-course-generator-40f0c.firebasestorage.app",
  messagingSenderId: "665868543386",
  appId: "1:665868543386:web:613f9378b388e9aaad4623",
  measurementId: "G-HHY9XJ6467"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);