document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in by checking localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        alert('You must be logged in to edit your profile.');
        window.location.href = 'login.html'; // Redirect to login if not logged in
    } else {
        // If logged in, pre-fill profile information
        const username = localStorage.getItem('username');
        const email = localStorage.getItem('email');
        
        document.getElementById('username').value = username;
        document.getElementById('email').value = email;
    }
});

document.getElementById('editProfileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get updated values from the form
    const updatedUsername = document.getElementById('username').value;
    const updatedEmail = document.getElementById('email').value;
    const updatedPassword = document.getElementById('password').value;

    // Save the updated profile info to localStorage (or send to backend in a real application)
    localStorage.setItem('username', updatedUsername);
    localStorage.setItem('email', updatedEmail);
    localStorage.setItem('password', updatedPassword);

    alert('Profile updated successfully!');
});

document.getElementById('logoutBtn').addEventListener('click', function() {
    // Clear the session information from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('password');

    // Redirect to login page
    window.location.href = 'login.html';
});
