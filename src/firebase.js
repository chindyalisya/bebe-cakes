import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Ganti dengan config milikmu dari Langkah 3
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "bebecakes.firebaseapp.com",
  projectId: "bebecakes",
  storageBucket: "bebecakes.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123..."
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);