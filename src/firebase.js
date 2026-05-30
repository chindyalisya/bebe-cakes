import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaz1D9oMFdOyauPkc3nlxaRHB40EA6kjI",
  authDomain: "bebecakes-56899.firebaseapp.com",
  projectId: "bebecakes-56899",
  storageBucket: "bebecakes-56899.firebasestorage.app",
  messagingSenderId: "943551694239",
  appId: "1:943551694239:web:d03064bba4911af7e969aa"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);