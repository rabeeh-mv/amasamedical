// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWs7gNJHvy5-I1yzFnPkzCLxI7ZIjMgV4",
  authDomain: "sample-fc1ba.firebaseapp.com",
  projectId: "sample-fc1ba",
  storageBucket: "sample-fc1ba.firebasestorage.app",
  messagingSenderId: "1016573512316",
  appId: "1:1016573512316:web:9a874d60e9cad0cb5f97f9",
  measurementId: "G-YZHZ9HRG4L"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
