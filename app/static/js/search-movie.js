import { API_BASE_URL } from "./config.js"
import { MovieCard, TrailerPopup } from "./sharedcomponents.js"


async function getMoviesByQuery(q) {
  const response = await fetch(`${API_BASE_URL}/movie`)
  const data = await response.json()

  if (!q) {
    return data
  }

  const searchedMovie = []
  data.forEach(movie => {
    const regexp = new RegExp(`.*${q}.*`, "i")
    if (regexp.test(movie.genre) || regexp.test(movie.title)) {
      searchedMovie.push(movie)
    }
  })

  return searchedMovie
}


document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");

  document.getElementById("search-query").textContent = q
  
  const searchResultsContainer = document.getElementById("search-results-container")
  let searchResultsMovieCards = ""
  
  try {
    const searchResults = await getMoviesByQuery(q)

    if (searchResults.length == 0) {
      searchResultsContainer.innerHTML = `<p>Sorry, the movie or genre that you searched does not exist</p>`
      return;
    }

    searchResults.forEach(movie => {
      searchResultsMovieCards += MovieCard(movie)
    })
    searchResultsContainer.innerHTML = searchResultsMovieCards

    const popupSpace = document.getElementById("popup-space")
    const trailerTriggers = document.querySelectorAll(".trailer-trigger")

    trailerTriggers.forEach(trigger => {
      trigger.addEventListener("click", (event) => {
        const movieTitle = event.currentTarget.dataset.movieTitle
        const trailerUrl = event.currentTarget.dataset.trailerUrl
        popupSpace.innerHTML = TrailerPopup(movieTitle, trailerUrl)          

        const closeButton = document.querySelector(".preview-close-btn"); // Assuming your button has a class 'close-button'
        closeButton.addEventListener("click", () => {
          popupSpace.innerHTML = ""; // Or any other action you want
        });
      })
    })
  } catch (error) {
    console.log(error)
  }
})
