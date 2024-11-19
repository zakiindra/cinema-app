import { SessionData } from "../utils/session.js";

function renderProfileForm(document, data) {
    document.getElementById("first-name").value = data.firstName;
    document.getElementById("last-name").value = data.lastName;
    document.getElementById("email").value = data.email;
    document.getElementById("address").value = data.address;
    document.getElementById("phone-number").value = data.phoneNumber;
    document.getElementById("subscribe-promo").checked = data.subscribePromo;
}

let customer;

document.addEventListener('DOMContentLoaded', function() {
    const session = new SessionData()
    const s = session.get_session()

    if (s.id == null || s.userType === "ADMIN") {
        window.location.href = 'http://localhost:8001/index.html';
        return;
    }

    fetch(`http://localhost:8080/customer/${s.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            renderProfileForm(document, data);
            customer = data;
        })
        .catch(error => {
            console.error('Error fetching profile data:', error);
            alert('Failed to load profile data.');
        });
});

document.getElementById('editProfileForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const session = new SessionData()

        const s = session.get_session()

        // const updatedPassword = document.getElementById('password').value;
        // const confirmPassword = document.getElementById('confirm-password').value;

        // if (updatedPassword !== confirmPassword) {
        //     alert("Confirm password did not match password.");

        //     document.getElementById('password').value = "";
        //     document.getElementById('confirm-password').value = "";

        //     return;
        // }

        const updatedProfile = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            phoneNumber: document.getElementById('phone-number').value,
            address: document.getElementById('address').value,
            subscribePromo: document.getElementById('subscribe-promo').checked
        };

        fetch(`http://localhost:8080/customer/${s.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProfile)
        })
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                return response.json();
            } else if (response.status === 400) {
                throw new Error('Invalid data submitted');
            } else if (response.status === 401) {
                throw new Error('Unauthorized. Please login again');
            } else if (response.status === 403) {
                throw new Error('You do not have permission to update this profile');
            } else if (response.status === 404) {
                throw new Error('Customer not found');
            } else if (response.status === 500) {
                throw new Error('Server error occurred');
            } else {
                throw new Error(`Unexpected status: ${response.status}`);
            }
        })
        .then(data => {
            alert('Profile updated successfully!');
            renderProfileForm(document, data);
        })
        .catch(error => {
            renderProfileForm(document, customer);
            console.error('Error updating profile:', error);
            alert('An error occurred while updating your profile.');
        });
});
