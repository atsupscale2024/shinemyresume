// Google Login callback
function handleGoogleLogin(response) {
  // Decode JWT token to get user info
  const id_token = response.credential;
  const base64Url = id_token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  const user = JSON.parse(jsonPayload);

  // Save user info in localStorage
  localStorage.setItem('user', JSON.stringify({
    name: user.name,
    email: user.email,
    picture: user.picture,
    sub: user.sub
  }));

  alert(`Welcome, ${user.name}! You are logged in.`);

  // Hide Google sign-in button and show logout button
  toggleLoginState(true);

  // Redirect to dashboard
  window.location.href = 'dashboard.html';
}

function toggleLoginState(loggedIn) {
  const signInWrapper = document.getElementById('googleSignInWrapper');
  if (!signInWrapper) return;

  if (loggedIn) {
    signInWrapper.style.display = 'none';
  } else {
    signInWrapper.style.display = 'flex';
  }
}

// Check login on page load and toggle UI accordingly
window.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    toggleLoginState(true);
  } else {
    toggleLoginState(false);
  }

  // Attach logout button if on profile page
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('user');
      alert('You have logged out.');
      toggleLoginState(false);
      window.location.href = 'index.html';
    });
  }

  // Form submit example on index.html
  const scanForm = document.getElementById('scan-form');
  if (scanForm) {
    scanForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Resume scanned! (Functionality placeholder)');
      // Here you would add your resume parsing/scanning logic
    });
  }
});
