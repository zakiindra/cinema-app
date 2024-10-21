document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.auth-form');
    const spinner = document.getElementById('spinner');
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        let valid = true;

        // Basic form validation
        if (!email) {
            document.getElementById('email').classList.add('error');
            valid = false;
        } else {
            document.getElementById('email').classList.remove('error');
        }

        if (!password) {
            document.getElementById('password').classList.add('error');
            valid = false;
        } else {
            document.getElementById('password').classList.remove('error');
        }

        if (valid) {
            spinner.style.display = 'block'; // Show spinner

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {
                    // Login successful, extract the response or token if needed
                    const result = await response.text();
                    alert(result); // Optionally show an alert or success message
                    
                    // Redirect to movies page and send email as a query parameter
                    window.location.href = `http://localhost:8080/movies.html?email=${encodeURIComponent(email)}`;
                } else {
                    const error = await response.text();
                    alert('Login failed: ' + error); // Handle error response
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.'); // Handle network errors
            } finally {
                spinner.style.display = 'none'; // Hide spinner
            }
        }
    });

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        togglePassword.textContent = type === 'password' ? 'Show' : 'Hide';
    });
});
