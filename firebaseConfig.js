// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMThsSj_GIMaBZvBb221xOP4Sqj0zyPL0",
  authDomain: "kishore-portfolio-c2a23.firebaseapp.com",
  projectId: "kishore-portfolio-c2a23",
  storageBucket: "kishore-portfolio-c2a23.firebasestorage.app",
  messagingSenderId: "797592002411",
  appId: "1:797592002411:web:fe1b037de8075e09a9762e",
  measurementId: "G-VSJV4LS9SD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);