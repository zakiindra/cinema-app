import { API_BASE_URL } from "./config.js"
import { MovieActions, TrailerPopup } from "./sharedcomponents.js"


async function getMovieById(id) {
  const response = await fetch(`${API_BASE_URL}/movie/${id}`)
  const data = await response.json()

  return data
}


document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("movie-id");

  try {
    const movie = await getMovieById(id)

    const hours = Math.floor(movie.durationMinutes / 60)  // divide by 60 minutes
    const minutes = movie.durationMinutes % 60

    movie.releaseDate = new Date(movie.releaseDate)
    const readableReleaseDate = movie.releaseDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
    
    document.getElementById("movie-poster").setAttribute("src", movie.posterUrl)
    document.getElementById("movie-title").textContent = movie.title
    document.getElementById("movie-context").textContent = `${hours} HOURS ${minutes} MINUTES | ${movie.rating}`
    document.getElementById("release-date").textContent = readableReleaseDate
    document.getElementById("genre").textContent = movie.genre 
    document.getElementById("movie-description").textContent = movie.description
    document.getElementById("directors").textContent = movie.directors
    document.getElementById("producers").textContent = movie.producers
    document.getElementById("casts").textContent = movie.casts

    document.getElementById("movie-profile-actions").innerHTML = MovieActions(movie)

    const popupSpace = document.getElementById("popup-space")
    const trailerTriggers = document.querySelectorAll(".trailer-trigger")

    trailerTriggers.forEach(trigger => {
      trigger.addEventListener("click", (event) => {
        const movieTitle = event.currentTarget.dataset.movieTitle
        const trailerUrl = event.currentTarget.dataset.trailerUrl
        popupSpace.innerHTML = TrailerPopup(movieTitle, trailerUrl)          

        const closeButton = document.querySelector(".preview-close-btn"); 
        closeButton.addEventListener("click", () => {
          popupSpace.innerHTML = "";
        });
      })
    })
  } catch (error) {
    console.log(error)
  }
})
