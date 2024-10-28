document.getElementById('otpForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const emailId = document.getElementById('emailId').value;
    const messageElement = document.getElementById('message');

    
    fetch('http://localhost:8080/api/otp/generate?emailId=' + encodeURIComponent(emailId), {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send OTP. Please try again.');
        }
        return response.text();
    })
    .then(data => {
        messageElement.textContent = data;
        
        setTimeout(() => {
            window.location.href = 'http://localhost:8001/auth/resetPassword.html';
        }, 2000); 
    })
    .catch(error => {
        messageElement.textContent = error.message;
    });
});
