document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    const confirmationMessage = document.getElementById('confirmationMessage');

    try {
        const response = await fetch('http://localhost:8080/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const result = await response.text();

        if (response.ok) {
    
            confirmationMessage.textContent = 'User registered successfully! A confirmation email has been sent to your inbox.';
            confirmationMessage.classList.add('success-message');
        } else {
            confirmationMessage.textContent = 'Error: ' + result;
            confirmationMessage.classList.add('error-message');
        }
    } catch (error) {
        console.error('Error:', error);
        confirmationMessage.textContent = 'An error occurred. Please try again later.';
        confirmationMessage.classList.add('error-message');
    }
});
