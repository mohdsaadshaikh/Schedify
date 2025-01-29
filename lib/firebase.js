// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyVsy5bqZbsaagIuP54FXoDWIEv9oYBbo",
  authDomain: "schedify-98d7b.firebaseapp.com",
  projectId: "schedify-98d7b",
  storageBucket: "schedify-98d7b.firebasestorage.app",
  messagingSenderId: "319944512040",
  appId: "1:319944512040:web:98a6e73178f9a8e3f09b1d",
  measurementId: "G-4R2FRK6NXN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
const analytics = getAnalytics(app);
