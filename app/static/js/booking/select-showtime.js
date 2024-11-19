import { API_BASE_URL } from "./../config.js"


async function getMovieById(id) {
  const response = await fetch(`${API_BASE_URL}/movie/${id}`)
  const data = await response.json()

  return data
}

function ShowtimeBoxSelector(num, value) {
 return `
    <div class="box-option">
      <input type="radio" name="showtimeId" value="${value}" id="showtimeId${num}">
      <label for="showtimeId1">${value}<br>1:00PM</label>
    </div>
  `
}


document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("movieId");

  const movie = await getMovieById(movieId)
  const hours = Math.floor(movie.durationMinutes / 60)  // divide by 60 minutes
  const minutes = movie.durationMinutes % 60

  movie.releaseDate = new Date(movie.releaseDate)
  const readableReleaseDate = movie.releaseDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  document.getElementById("movie-title").textContent = movie.title
  document.getElementById("movie-poster").setAttribute("src", movie.posterUrl)
  document.getElementById("movie-context").textContent = `${hours} HOURS ${minutes} MINUTES | ${movie.rating}`
  document.getElementById("movie-release-date").textContent = readableReleaseDate
  document.getElementById("movie-genre").textContent = movie.genre 
  document.getElementById("movie-description").textContent = movie.description 

  document.getElementById("showtime-selection").innerHTML = ShowtimeBoxSelector(1, "4/11")
})

