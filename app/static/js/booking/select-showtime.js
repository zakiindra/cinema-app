import { API_BASE_URL } from "./../config.js"
import {SessionData} from "../utils/session.js";


async function getMovieById(id) {
  const response = await fetch(`${API_BASE_URL}/movie/${id}`)
  const data = await response.json()

  return data
}

async function getUpcomingShows(id) {
  const response = await fetch(`${API_BASE_URL}/movie/${id}/upcoming-show`)
  const data = await response.json()
  
  return data
}

function ShowtimeBoxSelector(upcomingShow) {
 return `
    <div class="box-option">
      <input type="radio" name="showtimeId" value="showtimeId${upcomingShow.id}" id="showtimeId${upcomingShow.id}">
      <label for="showtimeId${upcomingShow.id}">${upcomingShow.date}<br>${upcomingShow.timeslot.startTime}<br>${upcomingShow.theater.name}</label>
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

  const upcomingShows = await getUpcomingShows(movieId) 
  let upcomingShowContent = ""
  upcomingShows.forEach(upcomingShow => {
    upcomingShowContent += ShowtimeBoxSelector(upcomingShow)
  })

  document.getElementById("showtime-selection").innerHTML = upcomingShowContent
})


