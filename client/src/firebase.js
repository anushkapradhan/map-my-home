// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "map-my-home.firebaseapp.com",
  projectId: "map-my-home",
  storageBucket: "map-my-home.appspot.com",
  messagingSenderId: "471716247845",
  appId: "1:471716247845:web:d57524b689be27cda802cc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);