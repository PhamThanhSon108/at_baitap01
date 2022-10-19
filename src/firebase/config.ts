import firebase, { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDfghLIsn1R99bqCCkK4-QVrbQg65JXf-c",
  authDomain: "intern-project01-82b24.firebaseapp.com",
  projectId: "intern-project01-82b24",
  storageBucket: "intern-project01-82b24.appspot.com",
  messagingSenderId: "703739431216",
  appId: "1:703739431216:web:697d699a7e5774782120f5",
  measurementId: "G-ED1ZDBYN89",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
// const analytics = getAnalytics(app);
