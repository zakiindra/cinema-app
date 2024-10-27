import { SessionData } from "../utils/session.js";
import { ensureCreditCardSlotAvailable } from "../guards.js";

document.getElementById("new-payment-method-form").addEventListener("submit", async (event) => {
    event.preventDefault()

    try {
        const isSlotAvailable = await ensureCreditCardSlotAvailable()

        if (isSlotAvailable == false) {
            alert("Not allowed! You have reached the maximum allowed number of credit cards (four)")
        } else {
            const sesssionData = new SessionData()
            const s = sesssionData.get_session()

            const form = event.target;  // 'event.target' refers to the form element
            const formData = new FormData(form);
            const formDataObj = Object.fromEntries(formData.entries());
            
            const response = await fetch(
                `http://localhost:8080/customer/${s.id}/creditCard`, 
                {
                    method: 'POST',
                    body: JSON.stringify(formDataObj),
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    }
                }
            )

            const data = response.json()
            alert("Credit card added successfully!")
        }
    } catch (error) {
        console.log(error)
    }
})