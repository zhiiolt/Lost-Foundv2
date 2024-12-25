/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUCjkUlPw-1CEVIAoLrtbxgzsI2ip6AnU",
  authDomain: "lost-and-found-pat.firebaseapp.com",
  projectId: "lost-and-found-pat",
  storageBucket: "lost-and-found-pat.firebasestorage.app",
  messagingSenderId: "607441960706",
  appId: "1:607441960706:web:a5506ba6b286ab8ebdcc1b",
  measurementId: "G-WDH7X5XD4F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
