// ================= FIREBASE =================
import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ================= FIREBASE CONFIG =================
const firebaseConfig = {

  apiKey: "AIzaSyBXd-cm0LbiHUbDyU-DLr3GH6wEqU93brE",

  authDomain: "fitcheck-c932e.firebaseapp.com",

  projectId: "fitcheck-c932e",

  storageBucket: "fitcheck-c932e.firebasestorage.app",

  messagingSenderId: "818891803519",

  appId: "1:818891803519:web:74a8f5636c0c22e36a284a",

  measurementId: "G-2051V328MD"
};


// ================= INITIALIZE =================
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


// ================= EXPORT =================
export { auth, db };