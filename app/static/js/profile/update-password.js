import { SessionData } from "../utils/session.js"

document.addEventListener("DOMContentLoaded", () => {
    const toggleButtons = document.querySelectorAll(".toggle-password")
    toggleButtons.forEach(toggle => {
        toggle.addEventListener("click", () => {
            const input = toggle.previousElementSibling; // Get the input before the button
            if (input.type === 'password') {
                input.type = 'text';
                toggle.textContent = 'Hide';
            } else {
                input.type = 'password';
                toggle.textContent = 'Show';
            }
        })
    })
})

document.getElementById("password-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const s = new SessionData();
    const sd = s.get_session();

    const form = event.target;  // 'event.target' refers to the form element
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());

    const response = await fetch(
        `http://localhost:8080/customer/${sd.id}/password`,
        {
            method: "PUT",
            body: JSON.stringify(formDataObj),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    )

    const data = await response.json()

    if (data === false) {
        alert("Failed to update the password, please check the current password or new password again");
        document.getElementById("current-password").value = null;
        document.getElementById("new-password").value = null;
        document.getElementById("confirm-new-password").value = null;
    } else {
        alert("Password successfully updated")
        document.getElementById("current-password").value = null;
        document.getElementById("new-password").value = null;
        document.getElementById("confirm-new-password").value = null;
    }


})