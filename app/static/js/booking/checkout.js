import { API_BASE_URL } from "../config.js"
import { SessionData } from "../utils/session.js"


async function getUserCreditCards(userId) {
  const response = await fetch(`${API_BASE_URL}/customer/${userId}/creditCard`)
  const data = await response.json()
  return data
}

async function getShowById(id) {
  const response = await fetch(`${API_BASE_URL}/show/${id}`)
  const data = await response.json()
  return data
}

function SeatSummaryRow(label, type, price) {
  return `
    <tr>
      <td>${label}</td>
      <td>${type}</td>
      <td>$${price}</td>
    </tr>
  `
}

function PaymentOption(creditCard) {
  const cardEnding = creditCard.cardNumber.slice(-4)
  
  return `
    <option value="">${creditCard.cardType} with ending ${cardEnding}</option>
  `
}

function applyPromo(event) {

}

function checkout(event) {

}

document.addEventListener('DOMContentLoaded', async function () {
  const session = new SessionData()

  const s = session.get_session();

  if (session.id != null && session.userType === "ADMIN") {
    window.location.href = 'http://localhost:8001/admin/index.html';
  }

  const params = new URLSearchParams(window.location.search);
  const showId = params.get("show");
  const seatLabels = params.get("seatLabels").split(",");
  const seatTypes = params.get("seatTypes").split(",");
  const seatIds = params.get("seatIds").split(",");
  const seatPrices = params.get("seatPrices").split(",");

  const show = await getShowById(showId);
  const movie = show.movie;

  const hours = Math.floor(movie.durationMinutes / 60)  // divide by 60 minutes
  const minutes = movie.durationMinutes % 60

  document.getElementById("movie-title").textContent = movie.title
  document.getElementById("movie-context").textContent = `${hours} HOURS ${minutes} MINUTES | ${movie.rating}`
  document.getElementById("selected-theater").textContent = `${show.theater.name}`
  document.getElementById("selected-showtime").textContent = `${show.date} ${show.timeslot.startTime.split(":").slice(0, 2).join(":")}`

    // popup = document.getElementById("popup");
    // document.querySelector(".new-payment-popup").addEventListener("click", () => {
    //     popup.style.display = "block";
    //     document.getElementById("popup-title").innerText = "Add New Payment Method";
    // })
    //
    // document.querySelector(".close-btn").addEventListener("click", () => {
    //     popup.style.display = "none";
    // })
  
  let bookingSummaryRows = ""

  for (let i = 0; i < seatTypes.length; i++) {
    bookingSummaryRows += SeatSummaryRow(seatLabels[i], seatTypes[i], seatPrices[i])
  }

  document.getElementById("seat-summary-list").innerHTML = bookingSummaryRows

  const totalPrice = seatPrices.reduce((total, num) => total + parseInt(num), 0)
  document.getElementById("order-total").textContent = `$${totalPrice}`

  const appliedPromo = 0
  document.getElementById("applied-promo-value").textContent = `-$${appliedPromo}`

  const finalDue = totalPrice - appliedPromo
  document.getElementById("final-due").textContent = `$${finalDue}`

  const userCreditCards = await getUserCreditCards(s.id)
  let paymentOptions = ""
  userCreditCards.forEach(cc => {
    console.log(cc)
    paymentOptions += PaymentOption(cc)
  })

  document.getElementById("user-card-select").innerHTML = paymentOptions
})
