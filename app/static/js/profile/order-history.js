import { DeleteButton, EditButton } from "../sharedcomponents.js"
import { SessionData } from "../utils/session.js"

document.addEventListener("DOMContentLoaded", () => {
    const sessionData = new SessionData()
    const s = sessionData.get_session()

    async function getOrderHistory() {
        const response = await fetch(`http://localhost:8080/customer/${s.id}/booking`)
        const data = await response.json()
        return data
    }

    function renderOrderHistory(orders) {
        const container = document.getElementById("order-history-list")

        container.innerHTML = "";

        if (orders.length === 0) {
            const content = document.createElement("tr")
            content.innerHTML = `
                <td colspan="5" style="text-align:center;">You haven't ordered any show.</td>
            `
            container.appendChild(content)
        }

        orders.forEach(order => {
            const content = document.createElement("tr")

            const tdMovieTitle = document.createElement("td");
            tdMovieTitle.textContent = order.show.movie.title;

            const tdShowroom = document.createElement("td");
            tdShowroom.textContent = order.show.theater.name;

            const tdDate = document.createElement("td");
            tdDate.textContent = order.show.date;

            const tdTime = document.createElement("td");
            tdTime.textContent = order.show.timeslot.startTime.substring(0, 5);

            const tdPaymentCard = document.createElement("td");
            tdPaymentCard.textContent = order.creditCard.maskedCardNumber;

            const tdPromoCode = document.createElement("td");
            if (order.promotion === null) {
                tdPromoCode.textContent = "-";
            } else {
                tdPromoCode.textContent = order.promotion.code;
            }

            const tdPaidAmount = document.createElement("td")
            tdPaidAmount.textContent = "$" + order.totalAmount;

            const tdSeats = document.createElement("td")
            tdSeats.textContent = order.tickets.map(ticket => ticket.seat.rowNumber + ticket.seat.seatNumber).join(", ")

            const elements = [tdMovieTitle, tdShowroom, tdDate, tdTime, tdPaymentCard, tdPromoCode, tdPaidAmount, tdSeats];

            elements.forEach(element => content.appendChild(element));
            container.appendChild(content)
        });
    }

    getOrderHistory().then(data => {
        renderOrderHistory(data)
    }).catch(e => {
        console.log(e)
    })
})
