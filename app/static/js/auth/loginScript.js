import { SessionData } from "../utils/session.js";

document.addEventListener("DOMContentLoaded", () => {
    const s = new SessionData();
    const session = s.get_session();

    if (session.id != null) {
        window.location.href = 'http://localhost:8001/index.html';
    }

    const form = document.querySelector('.auth-form');
    const spinner = document.getElementById('spinner');
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember-me').checked;
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
                let response = await fetch('http://localhost:8080/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                if (response.status === 400) {
                    alert('Invalid email or password');
                    return;
                }

                if (!response.ok) {
                    alert('Login failed, please try again later');
                    return;
                }

                const user = await response.json();
                console.log(user);

                if (user.userType === 'ADMIN') {
                    window.location.href = `http://localhost:8001/admin/index.html`;
                } else if (user.userType === 'CUSTOMER') {
                    response = await fetch(`http://localhost:8080/customer/${user.id}`);
                    const customer = await response.json();
                    s.set_session(user.id, customer.firstName, rememberMe)

                    window.location.href = `http://localhost:8001/index.html`;
                } else {
                    window.location.href = `http://localhost:8001/index.html`;
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
