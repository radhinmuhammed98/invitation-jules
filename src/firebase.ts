import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyCqnpC8pbt3ycLJG_rdUpaRWNfoTDfkwCI",
  authDomain: "wedding1-ab3f8.firebaseapp.com",
  projectId: "wedding1-ab3f8",
  storageBucket: "wedding1-ab3f8.firebasestorage.app",
  messagingSenderId: "82092679758",
  appId: "1:82092679758:web:19b71be6022f588c22191f",
  measurementId: "G-2GSZ23N416"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
