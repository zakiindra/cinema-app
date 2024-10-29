document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageElement = document.getElementById('message');

    if (newPassword !== confirmPassword) {
        messageElement.textContent = 'Passwords do not match.';
        return;
    }

    fetch('http://localhost:8080/api/auth/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, token, newPassword })
    }).then(response => {
        if (response.ok) {
            window.location.href = 'http://localhost:8001/auth/reset-password-success.html';
        }

        if (response.status === 400) {
            messageElement.textContent = 'Token is invalid or expired. Please try again.';
        }

        if (response.status === 500) {
            messageElement.textContent = 'Failed to reset password. Please try again later.';
        }
    });

});