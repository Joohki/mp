// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUJhXiW0h-SEKKx54u8TeJcbEXMiaSQ8Q",
  authDomain: "mp-project-66b1c.firebaseapp.com",
  projectId: "mp-project-66b1c",
  storageBucket: "mp-project-66b1c.appspot.com",
  messagingSenderId: "166774919800",
  appId: "1:166774919800:web:b58144eb4e3631fc2d538d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
