import { API_BASE_URL } from "./../config.js"
import {SessionData} from "../utils/session.js";

async function getMovieById(id) {
  const response = await fetch(`${API_BASE_URL}/movie/${id}`)
  const data = await response.json()

  return data
}

async function getShowById(id) {
  const response = await fetch(`${API_BASE_URL}/show/${id}`)
  const data = await response.json()

  return data
}

async function getOccupiedSeats(showId) {
    const response = await fetch(`${API_BASE_URL}/show/${showId}/occupied-seat`)
    const data = await response.json()

    return data
}

function SeatBoxSelector(num, seatValue) {
  return `
    <div class="box-option">
      <input type="checkbox" name="seat[]" id="seat${num}" value="${seatValue}">
      <label for="seat${num}">${seatValue}</label>
      <select name="seatType[]" id="">
        <option value="">Type</option>
        <option value="Adult">Adult</option>
        <option value="Child">Child</option>
        <option value="Elderly">Elderly</option>
      </select>
    </div>
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

  const show = await getShowById(showId);
  const movie = show.movie;

  const hours = Math.floor(movie.durationMinutes / 60)  // divide by 60 minutes
  const minutes = movie.durationMinutes % 60

  document.getElementById("movie-title").textContent = movie.title
  document.getElementById("movie-context").textContent = `${hours} HOURS ${minutes} MINUTES | ${movie.rating}`
  document.getElementById("selected-showtime").textContent = `${show.timeslot.startTime.split(":").slice(0, 2).join(":")}`

  const leftSideSeats = document.createElement("div");
  leftSideSeats.classList = ["seat-group"]
  const rightSideSeats = document.createElement("div");
  rightSideSeats.classList = ["seat-group"]

  for(let i = 0; i < 8; i++) {
    let seatCodes = ["A", "B", "C"]
    let currentRowBoxes = ""
    seatCodes.forEach(seatCode => {
      currentRowBoxes += SeatBoxSelector(`${seatCode}${i+1}`, `${seatCode}${i+1}`)
    })

    const currentRow = document.createElement("div")
    currentRow.innerHTML = currentRowBoxes
    
    document.getElementById("seat-selection").appendChild(currentRow)

    if (i < 4) {
      leftSideSeats.append(currentRow)
    } else {
      rightSideSeats.append(currentRow)
    }
  }

  document.getElementById("seat-selection").append(leftSideSeats)
  document.getElementById("seat-selection").append(rightSideSeats)

  getOccupiedSeats(showId).then(occupiedSeats => {
    occupiedSeats.forEach((seat) => {
      const seatName = seat.rowNumber+seat.seatNumber;
      document.getElementById(`seat${seatName}`).disabled = true;
      document.getElementById(`seat${seatName}`).style.backgroundColor = "#ff000040";
    });
  })

  // Add event listener for checkbox changes
  document.getElementById("seat-selection").addEventListener("change", (event) => {
    if (event.target.type === "checkbox") {
      const checkedBoxes = document.querySelectorAll('input[name="seat[]"]:checked');

      if (checkedBoxes.length > 4) {
        alert("You can only select up to 4 seats!");
        event.target.checked = false;
      }
    }
  });
})


