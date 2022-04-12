import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDb5Kd8-4o_6E8qXXOiTbXDtRVfR6Ax7Yw",
  authDomain: "merra-firebase-next.firebaseapp.com",
  projectId: "merra-firebase-next",
  storageBucket: "merra-firebase-next.appspot.com",
  messagingSenderId: "203712236631",
  appId: "1:203712236631:web:322485ab6fe32b9c3b6712",
  measurementId: "G-L5LRV2G7K5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, provider, storage };
