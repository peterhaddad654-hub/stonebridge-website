import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8iJv6XaiGs3VkL6VGXiowbEcU3f1_9vc",
  authDomain: "stonebridge-cfdee.firebaseapp.com",
  projectId: "stonebridge-cfdee",
  storageBucket: "stonebridge-cfdee.firebasestorage.app",
  messagingSenderId: "612214363602",
  appId: "1:612214363602:web:ce76b58175e030f038e40b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);