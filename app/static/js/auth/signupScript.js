import { SessionData } from "../utils/session.js";

document.addEventListener('DOMContentLoaded', () => {
    const s = new SessionData();
    const session = s.get_session();
    console.log(session);

    if (session.id != null) {
        window.location.href = 'http://localhost:8001/index.html';
    }

})

document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const address = document.getElementById('address').value;
    const subscribePromo = document.getElementById("subscribe-promo").checked;
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                "firstName": firstname,
                "lastName": lastname,
                "email": email,
                "password": password,
                "phoneNumber": phoneNumber,
                "address": address,
                "subscribePromo": subscribePromo
            }),
        });

        if (response.status === 409) {
            alert('Email already exists');
            return
        }

        if (!response.ok) {
            alert('Error registering account. Please try again later.');
            return
        }

        window.location.href = 'confirm-registration.html';
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
});
