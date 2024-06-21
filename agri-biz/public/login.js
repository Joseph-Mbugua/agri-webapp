// login.js
import { auth } from './firebase.js'; // Ensure the auth instance is correctly imported
import { signInWithEmailAndPassword } from "firebase/auth";

// Login function
function login(event) {
  event.preventDefault(); // Prevent form from submitting normally
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log('User logged in:', user);
      alert('Login successful!');
      window.location.href = 'products.html';
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('Login error:', errorMessage);
      alert(errorMessage);
    });
}

// Make the login function globally accessible
window.login = login;
