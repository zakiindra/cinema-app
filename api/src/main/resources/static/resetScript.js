document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const email = document.getElementById('email').value;
    const otp = document.getElementById('otp').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageElement = document.getElementById('message');

    
    if (newPassword !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    
    fetch('/api/customer/forgot-password?email=' + encodeURIComponent(email) +
          '&otp=' + encodeURIComponent(otp) +
          '&newPassword=' + encodeURIComponent(newPassword), {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to reset password. Please try again.');
        }
        return response.text();
    })
    .then(data => {
        messageElement.textContent = data;

        
        setTimeout(() => {
            window.location.href = 'login.html'; 
        }, 2000); 
    })
    .catch(error => {
        messageElement.textContent = error.message;
    });
});