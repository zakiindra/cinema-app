document.addEventListener('DOMContentLoaded', function() {
    // Fetch profile data from backend when page loads
    fetch('/api/getProfile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Assuming the server returns an object with firstName, lastName, email, address
        document.getElementById('first-name').value = data.firstName;
        document.getElementById('last-name').value = data.lastName;
        document.getElementById('email').value = data.email;
        document.getElementById('address').value = data.address;
    })
    .catch(error => {
        console.error('Error fetching profile data:', error);
        alert('Failed to load profile data.');
    });
});

document.getElementById('editProfileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get updated values from the form
    const updatedFirstName = document.getElementById('first-name').value;
    const updatedLastName = document.getElementById('last-name').value;
    const updatedEmail = document.getElementById('email').value;
    const updatedAddress = document.getElementById('address').value;
    const updatedPassword = document.getElementById('password').value;

    const profileData = {
        firstName: updatedFirstName,
        lastName: updatedLastName,
        email: updatedEmail,
        address: updatedAddress,
        password: updatedPassword  
    };

    fetch('/api/updateProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Profile updated successfully!');
            window.location.href = '/index.html';  // Redirect to profile page after success
        } else {
            alert('Failed to update profile: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error updating profile:', error);
        alert('An error occurred while updating your profile.');
    });
});
