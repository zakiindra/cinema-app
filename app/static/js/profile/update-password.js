import { SessionData } from "../utils/session.js"

document.getElementById("password-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const s = new SessionData();
    const sd = s.get_session();

    const form = event.target;  // 'event.target' refers to the form element
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());

    console.log(formDataObj)

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
    console.log(data)

    if (data === false) {
        alert("Failed to update the password, please check the current password or new password again")
    } else {
        alert("Password successfully updated")
    }
})