document.getElementById('otpForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const messageElement = document.getElementById('message');

    fetch('http://localhost:8080/api/auth/forgot-password?email=' + encodeURIComponent(email), {
        method: 'POST'
    }).then(response => {
        if (response.ok) {
            window.location.href = 'http://localhost:8001/auth/reset-password-sent.html';
        }
        if (response.status === 404) {
            messageElement.textContent = 'Email not found.';
        }

        if (response.status === 500) {
            messageElement.textContent = 'Failed to send reset password link. Please try again later.';
        }
    });
});
