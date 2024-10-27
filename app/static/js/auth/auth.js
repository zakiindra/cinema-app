async function verifyEmail(email, token) {
    const response = await fetch('http://localhost:8080/api/auth/verify?email=' + email + '&token=' + token);
    console.log(response)

    const messageDiv = document.getElementById('message');
    const loginLink = document.getElementById('loginLink');

    if (response.ok) {
        messageDiv.innerHTML = '<div style="color: green;">Email verified successfully</div>';
        loginLink.style.display = 'block';
    } else {
        messageDiv.innerHTML = '<div style="color: red;">Invalid verification request</div>';
    }
}

// Handle verification on page load
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');

    console.log(email);
    console.log(token);
    console.log(email && token)

    if (email && token) {
        verifyEmail(email, token);
    } else {
        document.getElementById('message').innerHTML =
            '<div style="color: red;">Invalid verification request</div>';
    }
});