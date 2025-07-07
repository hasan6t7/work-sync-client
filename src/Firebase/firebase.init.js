// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGbGVOVgvRCWRhI8mloh65ADCWyvdIeSc",
  authDomain: "work-syncc.firebaseapp.com",
  projectId: "work-syncc",
  storageBucket: "work-syncc.firebasestorage.app",
  messagingSenderId: "908661900779",
  appId: "1:908661900779:web:b406d36ce65b31196305ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);