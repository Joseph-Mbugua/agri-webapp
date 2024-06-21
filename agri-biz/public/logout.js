import auth from './firebase.js';

// Logout
function logout() {
  auth.signOut()
    .then(() => {
      console.log('User signed out');
      alert('Logged out successfully!');
      window.location.href = 'login.html';

      // Redirect or update UI
    })
    .catch((error) => {
      console.error('Sign out error:', error);
      alert('Error logging out!');
    });
}

window.logout = logout;
