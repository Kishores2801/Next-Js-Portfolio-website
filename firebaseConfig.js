// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSml4YWOE7Zl5DMX-qte-fM4RqgkEd0E0",
  authDomain: "kishore-portfolio-app.firebaseapp.com",
  projectId: "kishore-portfolio-app",
  storageBucket: "kishore-portfolio-app.firebasestorage.app",
  messagingSenderId: "503424818673",
  appId: "1:503424818673:web:db646dfff55548ac21b850",
  measurementId: "G-P0JH9K6G1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);