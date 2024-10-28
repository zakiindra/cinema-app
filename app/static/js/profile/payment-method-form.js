import { ensureAuthenticated } from "../guards.js";

function handleNewPaymentMethod(event) {
    const s = ensureAuthenticated()

    event.preventDefault()

    const form = event.target;  // 'event.target' refers to the form element
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());

    fetch(
        `http://localhost:8080/customer/${s.id}/creditCard`,
        {
            method: 'POST',
            body: JSON.stringify(formDataObj),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        if (response.ok) {
            window.location.href = 'http://localhost:8001/profile/index.html';
        }
    }).catch((e) => {
        console.log(e)
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-payment-form');
    form.addEventListener('submit', handleNewPaymentMethod);
});