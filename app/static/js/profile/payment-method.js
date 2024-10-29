import { SessionData } from "../utils/session.js"

document.addEventListener("DOMContentLoaded", () => {
    const sessionData = new SessionData()
    const s = sessionData.get_session()

    async function getPaymentMethods() {
        const response = await fetch(`http://localhost:8080/customer/${s.id}/creditCard`)
        const data = await response.json()
        return data
    }

    function renderPaymentMethods(paymentMethods) {
        const container = document.getElementById("payment-method-list")

        container.innerHTML = "";

        if (paymentMethods.length == 0) {
            const content = document.createElement("tr")
            content.innerHTML = `
                <td colspan="5" style="text-align:center;">No payment methods configured</td>
            `
            container.appendChild(content)
        } 

        paymentMethods.forEach(paymentMethod => {
            const content = document.createElement("tr")
            
            const tdNumbering = document.createElement("td");
            tdNumbering.classList.add("numbering");
            tdNumbering.textContent = "1";

            const tdMovieTitle = document.createElement("td");
            tdMovieTitle.textContent = paymentMethod.cardNumber;

            const tdPaymentType = document.createElement("td");
            tdPaymentType.textContent = paymentMethod.cardType;

            const tdExpiry = document.createElement("td")
            tdExpiry.textContent = paymentMethod.expirationDate

            const tdAction = document.createElement("td")
            tdAction.classList.add("actions");
            tdAction.innerHTML = `
                <a href="http://localhost:8001/payment-method.html?id=${paymentMethod.id}" class="table-button edit-button" style="text-decoration: none;">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <span>Edit</span>
                </a>
                <button class="table-button delete-button" data-id=${paymentMethod.id}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                    </svg>
                    <span>Delete</span>
                </button>
            `

            const elements = [tdNumbering, tdMovieTitle, tdPaymentType, tdExpiry, tdAction];

            elements.forEach(element => content.appendChild(element));
            container.appendChild(content)
        });

        // Delete button functionality
        const deleteButtons = document.querySelectorAll(".delete-button")
        console.log(`Found ${deleteButtons.length} delete buttons`)
        deleteButtons.forEach(button => {
            button.addEventListener('click', async () => {
                confirm("Are you sure? This action is not reversible")

                try {
                    const response = await fetch(
                        `http://localhost:8080/customer/${s.id}/creditCard/${button.dataset.id}`,
                        {
                            method: "DELETE",
                            headers: {
                                'Content-Type': "application/json",
                                'Accept': "application/json"
                            }
                        }
                    )
                } catch (error) {
                    alert(error)
                }

                alert("Payment method removed!")

                getPaymentMethods().then(data => {
                    renderPaymentMethods(data)
                }).catch(e => {
                    console.log(e)
                })
            })
        })
    }

    getPaymentMethods().then(data => {
        renderPaymentMethods(data)
    }).catch(e => {
        console.log(e)
    })
})