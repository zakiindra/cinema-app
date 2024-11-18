import { API_BASE_URL, API_HEADERS } from "../config.js"
import { DeleteButton, EditButton, EmptyContentRow } from "../sharedcomponents.js"

async function getAllMovies() {
    const response = await fetch(
      `${API_BASE_URL}/movie`, 
      { method: "GET", headers: API_HEADERS }
    )

    return response.json()
}

function MovieTableRow(movie) {
  return `
    <tr>
      <td class="movie-title">${movie.title}</td>
      <td>${movie.releaseDate}</td>
      <td><a href="showtime.html">Edit Showtime</a></td>
      <td class="actions">
        ${EditButton()}
        ${DeleteButton(movie.id)}
      </td>
    </tr>
  `
}

async function deleteMovie(event) {
  const confirmation = confirm("Are you sure? This action is not reversible")

  if (!confirmation) {
    return;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/movie/${event.currentTarget.dataset.id}`,
      { method: "DELETE", headers: API_HEADERS }
    )

    alert("Movie successfully deleted")
    window.location.reload()
  } catch (error) {
    alert(error)
  }
}

document.addEventListener("DOMContentLoaded", async () => {
    const table = document.getElementById("movie-table-body")
    let moviesContent = ""

    try {
        const movies = await getAllMovies()
        if (movies.length > 0) {
          movies.forEach(movie => {
            moviesContent += MovieTableRow(movie)
          });
        } else {
          moviesContent += EmptyContentRow(4, "No movies available")
        }

        table.innerHTML = moviesContent
    } catch (error) {
        console.log(error)
    }

    const deleteButtons = document.querySelectorAll(".delete-button")
    deleteButtons.forEach(button => {
      button.addEventListener("click", deleteMovie)
    })
})
