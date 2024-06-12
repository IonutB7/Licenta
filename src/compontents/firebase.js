// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeYOU5fjCrcznFNbnnURq4B_QdivWWWKU",
  authDomain: "bidbay-auth-aa8cb.firebaseapp.com",
  projectId: "bidbay-auth-aa8cb",
  storageBucket: "bidbay-auth-aa8cb.appspot.com",
  messagingSenderId: "179133997114",
  appId: "1:179133997114:web:1dd821776ac36fa7a5d503",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const PicturesDb = getStorage();

// if (window.location.hostname === "localhost") {
//   connectAuthEmulator(auth, "http://127.0.0.1:9099");
//   connectFirestoreEmulator(db, "127.0.0.1", 8080);
//   connectStorageEmulator(PicturesDb, "127.0.0.1", 9199);
// }
export default app;
