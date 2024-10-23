document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.auth-form');
    const spinner = document.getElementById('spinner');
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        let valid = true;

        // Basic form validation
        if (!username) {
            document.getElementById('username').classList.add('error');
            valid = false;
        } else {
            document.getElementById('username').classList.remove('error');
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
                    body: JSON.stringify({ username, password })
                });

                if (response.ok) {
                    const customer = await response.json();
                    sessionStorage.setItem("customer_id", customer["id"]);

                    window.location.href = `http://localhost:8080/movies.html?username=${encodeURIComponent(username)}`;
                } else {
                    const error = await response.text();
                    alert('Login failed: ' + error); 
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.'); 
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
