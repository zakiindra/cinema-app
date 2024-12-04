import { API_BASE_URL } from "./config.js"
import { SessionData } from "./utils/session.js"


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

document.addEventListener("DOMContentLoaded", async () => {
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


  let bookingSummaryRows = ""

  for (let i = 0; i < seatTypes.length; i++) {
    bookingSummaryRows += SeatSummaryRow(seatLabels[i], seatTypes[i], seatPrices[i])
  }

  document.getElementById("seat-summary-list").innerHTML = bookingSummaryRows

  const totalPrice = seatPrices.reduce((total, num) => total + parseInt(num), 0)
  document.getElementById("total-price").textContent = `$${totalPrice}`
})
