async function getAllMovies() {
    url = "http://localhost:8080/movie"
    const response = await fetch(url, {
        method: "GET", 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    return response.json()
}

function renderTableRow(table, movie) {
    tableRow = document.createElement("tr");
    tableRow.innerHTML = `
        <td class="numbering">3</td>
        <td class="movie-title">${movie.title}</td>
        <td>September 28th, 2024</td>
        <td><a href="showtime.html">Edit Showtime</a></td>
        <td class="actions">
            <button class="table-button edit-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                <span>Edit</span>
            </button>
            <button class="table-button delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                </svg>
                <span>Delete</span>
            </button>
        </td>
    `
    table.append(tableRow)
}

document.addEventListener("DOMContentLoaded", async () => {
    table = document.getElementById("movie-table-body")

    try {
        movies = await getAllMovies()
        movies.forEach(movie => {
            renderTableRow(table, movie)
        });
    } catch (error) {
        console.log(error)
    }
})