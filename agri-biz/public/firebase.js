  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";



  const firebaseConfig = {
    apiKey: "AIzaSyAlCMR9NQgWg2r1I1xPZ2AZ6lk-yoZDOOg",
    authDomain: "agriculture-ecomm.firebaseapp.com",
    databaseURL: "https://agriculture-ecomm-default-rtdb.firebaseio.com",
    projectId: "agriculture-ecomm",
    storageBucket: "agriculture-ecomm.appspot.com",
    messagingSenderId: "1081774247089",
    appId: "1:1081774247089:web:6c57438b3bae218bcf2690",
    measurementId: "G-3EJRGTGY4V"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = firebase.firestore(app);
  const storage = firebase.storage(app);
  const auth = getAuth();



  export { app, db, auth, storage, getStorage };
  export default app;