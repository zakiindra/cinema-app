import { DeleteButton, EditButton } from "../sharedcomponents.js"
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
            
            const tdMovieTitle = document.createElement("td");
            tdMovieTitle.textContent = paymentMethod.cardNumber;

            const tdPaymentType = document.createElement("td");
            tdPaymentType.textContent = paymentMethod.cardType;

            const tdExpiry = document.createElement("td")
            tdExpiry.textContent = paymentMethod.expirationDate

            const tdAction = document.createElement("td")
            tdAction.classList.add("actions");
            tdAction.innerHTML = `
              ${EditButton()}
              ${DeleteButton(paymentMethod.id)}
            `

            const elements = [tdMovieTitle, tdPaymentType, tdExpiry, tdAction];

            elements.forEach(element => content.appendChild(element));
            container.appendChild(content)
        });

        // Delete button functionality
        const deleteButtons = document.querySelectorAll(".delete-button")
        console.log(`Found ${deleteButtons.length} delete buttons`)
        deleteButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const confirmation = confirm("Are you sure? This action is not reversible")
                if (!confirmation) {
                  return;
                }

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
