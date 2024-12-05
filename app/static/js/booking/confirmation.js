import { API_BASE_URL, API_HEADERS } from "../config.js"
import {SessionData} from "../utils/session.js";

async function getBookingData(bookingId) {
    const response = await fetch(`${API_BASE_URL}/booking/${bookingId}`)
    const data = await response.json()
    return data
}

document.addEventListener('DOMContentLoaded', async function () {
    const session = new SessionData()

    const s = session.get_session();

    if (session.id != null && session.userType === "ADMIN") {
        window.location.href = 'http://localhost:8001/admin/index.html';
    }

    const params = new URLSearchParams(window.location.search);
    const bookingId = params.get("booking");
    const bookingData = await getBookingData(bookingId);

    if (bookingData.userId != session.id) {
        window.location.href = 'http://localhost:8001/index.html';
    }

    bookingData.tickets.forEach(ticket => {
        const ticketElement = document.createElement("tr");
        ticketElement.classList.add("ticket");

        const ticketSeatElement = document.createElement("td");
        ticketSeatElement.textContent = `${ticket.seat.rowNumber + ticket.seat.seatNumber}`;

        const ticketTitleElement = document.createElement("td");
        ticketElement.style.textAlign = "center";
        ticketTitleElement.textContent = ticket.priceType.name;

        const ticketPriceElement = document.createElement("td");
        ticketPriceElement.style.textAlign = "center";
        ticketPriceElement.textContent = `$${ticket.priceType.amount}`;

        ticketElement.appendChild(ticketSeatElement);
        ticketElement.appendChild(ticketTitleElement);
        ticketElement.appendChild(ticketPriceElement);

        document.getElementById("ticket-list").appendChild(ticketElement);
    });

    const movieTitleElement = document.getElementById("movie-title");
    const showtimeElement = document.getElementById("showtime");
    const cardNumberElement = document.getElementById("card-number");
    const appliedPromoElement = document.getElementById("applied-promo-code");
    const totalPaidElement = document.getElementById("total-paid");

    movieTitleElement.textContent = bookingData.show.movie.title;
    showtimeElement.textContent = `Showtime ${bookingData.show.date} ${bookingData.show.timeslot.startTime.substring(0, 5)}`;
    cardNumberElement.textContent = `Card ending ${bookingData.creditCard.maskedCardNumber}`;
    appliedPromoElement.textContent = bookingData.promotion ? `${bookingData.promotion.code} ($${bookingData.promotion.promotionValue} OFF)` : "-";
    totalPaidElement.textContent = `$${bookingData.totalAmount}`;

})