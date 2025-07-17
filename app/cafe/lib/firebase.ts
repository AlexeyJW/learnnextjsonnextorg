// Import the functions you need from the SDKs you need

// import { getAnalytics } from "firebase/analytics";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIYiey4z6QDSdcv5PfgRZTH7nbDp69wGQ",
  authDomain: "cafe-27f55.firebaseapp.com",
  projectId: "cafe-27f55",
  storageBucket: "cafe-27f55.firebasestorage.app",
  messagingSenderId: "1037323664804",
  appId: "1:1037323664804:web:c7d488a81edc22405e1531",
  measurementId: "G-XSEEJDQNNW"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
console.log(db, 'Firestore initialized');
export const auth = getAuth(app);
// const analytics = getAnalytics(app);