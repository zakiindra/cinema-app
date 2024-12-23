import { MovieCard, TrailerPopup } from "./sharedcomponents.js";


async function getAllMovies() {
  const response = await fetch("http://localhost:8080/movie")
  const data = await response.json();
  
  const upcomingMovies = []
  const nowPlayingMovies = []

  const today = new Date()
  data.forEach((movie) => {
    const releaseDate = new Date(movie.releaseDate)
    if (releaseDate <= today) {
      nowPlayingMovies.push(movie)
    } else if (releaseDate > today) {
      upcomingMovies.push(movie)
    }
  })

  return {
    nowPlayingMovies: nowPlayingMovies,
    upcomingMovies: upcomingMovies
  }
}

async function getNowPlaying() {
  const response = await fetch("http://localhost:8080/movie/now-playing")
  const data = await response.json();
  return data
}

async function getUpcomingMovies() {
  const response = await fetch("http://localhost:8080/movie/upcoming")
  const data = await response.json();
  return data
}


document.addEventListener("DOMContentLoaded", async function () {
    const upcomingMoviesContainer = document.getElementById("upcoming-movies");
    let upcomingMovieCards = ""

    const nowPlayingMoviesContainer = document.getElementById("now-playing-movies");
    let nowPlayingMovieCards = ""
    
    try {
      let nowPlayingMovies = await getNowPlaying();
      let upcomingMovies = await getUpcomingMovies();

      upcomingMovies.forEach((movie) => {
        upcomingMovieCards += MovieCard(movie, false)
      })

      nowPlayingMovies.forEach((movie) => {
        nowPlayingMovieCards += MovieCard(movie, true)
      })
      
      upcomingMoviesContainer.innerHTML = upcomingMovieCards
      nowPlayingMoviesContainer.innerHTML = nowPlayingMovieCards 

      
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

    } catch(error) {
      console.log(error)
    }
});
