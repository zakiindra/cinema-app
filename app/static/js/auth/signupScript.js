document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const username = document.getElementById('username').value;
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
                "username": username,
                "email": email,
                "password": password,
                "phoneNumber": phoneNumber,
                "address": address,
                "subscribePromo": subscribePromo
            }),
        });

        const result = await response.json();

        console.log(result)

        if (response.ok) {
            alert('User registered successfully!');
            window.location.href = 'confirm-registration.html';
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
});
