import { API_BASE_URL } from "./../config.js"

async function getMovieById(id) {
  const response = await fetch(`${API_BASE_URL}/movie/${id}`)
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
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("movieId");

  const movie = await getMovieById(movieId)
  const hours = Math.floor(movie.durationMinutes / 60)  // divide by 60 minutes
  const minutes = movie.durationMinutes % 60

  document.getElementById("movie-title").textContent = movie.title
  document.getElementById("movie-context").textContent = `${hours} HOURS ${minutes} MINUTES | ${movie.rating}`

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
})


