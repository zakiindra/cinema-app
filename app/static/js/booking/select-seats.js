import { API_BASE_URL } from "./../config.js"
import {SessionData} from "../utils/session.js";

// async function getMovieById(id) {
//   const response = await fetch(`${API_BASE_URL}/movie/${id}`)
//   const data = await response.json()
//   return data
// }

async function getPriceTypes() {
  const response = await fetch(`${API_BASE_URL}/price-type`)
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

function PricingTableRow(name, amount) {
  return `
    <tr>
      <td><b>${name}</b></td>
      <td><b>:</b></td>
      <td>$${amount}</td>
    </tr>
  `
}

function SeatBoxSelector(num, seatLabel, seatValue, priceTypes) {
  let options = ""

  priceTypes.forEach(pt => {
    options += `<option value="${pt.id}">${pt.name}</option>`
  })

  return `
    <div class="box-option">
      <input type="checkbox" name="seat[]" id="seat${num}" value="${seatValue}">
      <label for="seat${num}">${seatLabel}</label>
      <select name="seatType[]" id="seatType${num}">
        <option value="">Type</option>
        ${options}
      </select>
    </div>
  `
}

function continueToSummary(event, showId) {
  event.preventDefault()

  const priceMapping = {
    'Adult': 12,
    'Children': 6,
    'Elderly': 8
  }

  const form = document.getElementById("select-seats-form")

  const checkedSeatsF = form.querySelectorAll('input[name="seat[]"]:checked');
  const checkedSeats = Array.from(checkedSeatsF).map(input => input.value);

  const checkedSeatsL = Array.from(checkedSeatsF).map(input => {
    const label = document.querySelector(`label[for="${input.id}"]`);
    return label ? label.textContent : null;
  });

  const checkedSeatsTypesF = form.querySelectorAll('select[name="seatType[]"]');
  const checkedSeatsTypes = Array.from(checkedSeatsTypesF)
    .map(input => input.value)
    .filter(value => value !== "");

  const seatPrices = Array.from(checkedSeatsTypes).map(dropdown => {
    console.log(dropdown)
    const selectedValue = dropdown;
    return priceMapping[selectedValue] || 0; // Default to 0 if no matching value
  });

  const params = new URLSearchParams();
  params.append("show", showId);
  params.append("seatIds", checkedSeats.join(","));
  params.append("seatLabels", checkedSeatsL.join(","));
  params.append("seatTypes", checkedSeatsTypes.join(","));
  params.append("seatPrices", seatPrices.join(","));

  window.location.href=`http://localhost:8001/order/summary.html?${params}`
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
  document.getElementById("selected-theater").textContent = `${show.theater.name}`
  document.getElementById("selected-showtime").textContent = `${show.date} ${show.timeslot.startTime.split(":").slice(0, 2).join(":")}`

  // Price types
  const priceTypes = await getPriceTypes()

  let priceTypesL = ""
  priceTypes.forEach(pt => {
    priceTypesL += PricingTableRow(pt.name, pt.amount)
  })
  document.getElementById("pricing-table").innerHTML = priceTypesL


  const leftSideSeats = document.createElement("div");
  leftSideSeats.classList = ["seat-group"]
  const rightSideSeats = document.createElement("div");
  rightSideSeats.classList = ["seat-group"]

  let seatBoxCount = 0
  const baseValue = (show.theater.id - 1) * 24;
  const seatCodes = ["A", "B", "C"]
  seatCodes.forEach(seatCodesV => {
    let leftRowBoxes = ""
    let rightRowBoxes = ""

    for (let i = 0; i < 8; i++) {
      const seatBox = SeatBoxSelector(
        `${seatCodesV}${i + 1}`,
        `${seatCodesV}${i + 1}`,
        `${baseValue + (seatBoxCount + 1)}`,
        priceTypes
      );

      if (i < 4) {
        leftRowBoxes += seatBox
      } else {
        rightRowBoxes += seatBox
      }

      seatBoxCount++
    }

    const leftRow = document.createElement("div")
    leftRow.classList.add("row");
    leftRow.innerHTML = leftRowBoxes;
    leftSideSeats.append(leftRow);
    const rightRow = document.createElement("div")
    rightRow.classList.add("row");
    rightRow.innerHTML = rightRowBoxes;
    rightSideSeats.append(rightRow);
  })

  document.getElementById("seat-selection").append(leftSideSeats)
  document.getElementById("seat-selection").append(rightSideSeats)

  getOccupiedSeats(showId).then(occupiedSeats => {
    occupiedSeats.forEach((seat) => {
      const seatName = seat.rowNumber+seat.seatNumber;
      document.getElementById(`seat${seatName}`).disabled = true;
      document.getElementById(`seatType${seatName}`).disabled = true;
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

  document.getElementById("select-seats-form").addEventListener("submit", (event) => {
    continueToSummary(event, showId)
  })
})


