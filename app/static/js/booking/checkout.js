import { API_BASE_URL, API_HEADERS } from "../config.js"
import { SessionData } from "../utils/session.js"


async function getPriceTypes() {
  const response = await fetch(`${API_BASE_URL}/price-type`)
  const data = await response.json()
  return data
}

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
    <option value="${creditCard.id}">${creditCard.cardType} with ending ${cardEnding}</option>
  `
}

let PROMO_CODE = ""
async function applyPromo(event, totalPrice, customerId) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const entries = Object.fromEntries(formData.entries())

  const response = await fetch(`${API_BASE_URL}/customer/${customerId}/promo/${entries["promoCode"]}`)

  if (response.status === 400) {
    document.getElementById("promo-message").textContent = `You have used this promo code before.`
    document.getElementById("applied-promo-value").textContent = `-$0`
    document.getElementById("final-due").textContent = `$${totalPrice}`
  } else if (response.status === 404) {
    document.getElementById("promo-message").textContent = `Promo code is invalid.`
    document.getElementById("applied-promo-value").textContent = `-$0`
    document.getElementById("final-due").textContent = `$${totalPrice}`
  } else {
    const data = await response.json()

    if (data.promotionValue > totalPrice) {
      document.getElementById("promo-message").textContent = `Promo value is bigger than order, will not be applied`
      document.getElementById("applied-promo-value").textContent = `-$0`
      document.getElementById("final-due").textContent = `$${totalPrice}`
      return
    }

    document.getElementById("promo-message").textContent = `Promo code ${entries["promoCode"]} applied, you got $${data.promotionValue} off!`
    document.getElementById("applied-promo-value").textContent = `-$${data.promotionValue}`
    document.getElementById("final-due").textContent = `$${totalPrice - data.promotionValue}`
    PROMO_CODE = data.code
  }
}

// let finalDue = 0
// async function calculateFinalDue(){}

async function checkout(event, userId, showId, promotionCode, seatIds, priceTypeIds) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const entries = Object.fromEntries(formData.entries())

  const seatBookings = []
  for (let i = 0; i < seatIds.length; i++) {
    seatBookings.push({
      'seatId': seatIds[i],
      'priceTypeId': priceTypeIds[i]
    })
  }

  const body = {
    'userId': userId,
    'showId': showId,
    'creditCardId': entries["creditCardId"],
    'promotionCode': promotionCode,
    'seatBookings': seatBookings
  }

  console.log(body)

  const response = await fetch(`${API_BASE_URL}/booking`, { 
    method: "POST",
    headers: API_HEADERS,
    body: JSON.stringify(body)
  })

  const data = await response.json()

  if (data) {
    alert("Booking completed, check your email to confirm, Thank you!")
    window.location.href = 'http://localhost:8001/profile/order-history.html';
  }
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

  const priceTypes = await getPriceTypes()
  let bookingSummaryRows = ""
  let totalPrice = 0
  let matchingPriceTypesId = []
  for (let i = 0; i < seatTypes.length; i++) {
    const matchingPriceType = priceTypes.filter(pt => pt.id === parseInt(seatTypes[i]))[0]
    matchingPriceTypesId.push(matchingPriceType.id)
    totalPrice += matchingPriceType.amount
    bookingSummaryRows += SeatSummaryRow(seatLabels[i], matchingPriceType.name, matchingPriceType.amount)
  }

  document.getElementById("seat-summary-list").innerHTML = bookingSummaryRows
  document.getElementById("order-total").textContent = `$${totalPrice}`

  const finalDue = totalPrice
  document.getElementById("final-due").textContent = `$${finalDue}`

  const userCreditCards = await getUserCreditCards(s.id)
  let paymentOptions = ""
  userCreditCards.forEach(cc => {
    console.log(cc)
    paymentOptions += PaymentOption(cc)
  })

  document.getElementById("user-card-select").innerHTML = paymentOptions

  document.getElementById("apply-promo-form").addEventListener("submit", (event) => {
    applyPromo(event, totalPrice, session.id)
  })

  document.getElementById("checkout-form").addEventListener("submit", (event) => {
    checkout(
      event, 
      session.id, 
      showId, 
      PROMO_CODE, 
      seatIds, 
      matchingPriceTypesId)
  })
})
