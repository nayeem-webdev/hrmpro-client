// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcZl_p-b1ixEuQuUnCnbyeipTgfXWEul0",
  authDomain: "hrmpro-1.firebaseapp.com",
  projectId: "hrmpro-1",
  storageBucket: "hrmpro-1.firebasestorage.app",
  messagingSenderId: "398521572775",
  appId: "1:398521572775:web:966baf72fd53d564e3ea82",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
