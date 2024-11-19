import {API_BASE_URL, API_HEADERS} from "./config.js";
import {DeleteButton, EmptyContentRow} from "./sharedcomponents.js";

async function getShowByMovieId(movieId) {
    const response = await fetch(
        `${API_BASE_URL}/movie/${movieId}/show`,
        { method: "GET", headers: API_HEADERS }
    )

    return response.json()
}

async function getTheaters() {
    const response = await fetch(
        `${API_BASE_URL}/theater`,
        { method: "GET", headers: API_HEADERS }
    )

    return response.json()
}

async function getAvailableTimeslots(movieId, theaterId, date) {
    const response = await fetch(
        `${API_BASE_URL}/movie/${movieId}/show/available-timeslots?date=${date}&theater=${theaterId}`,
        { method: "GET", headers: API_HEADERS }
    )

    return response.json()
}

function renderAvailableTimeslot(movieId, theater, date) {
    if (!theater || !date) {
        return;
    }
    const timeSelect = document.getElementById("input-timeslot");
    getAvailableTimeslots(movieId, theater, date).then(timeslots => {
        timeSelect.innerHTML = "";
        timeslots.forEach(timeslot => {
            let option = document.createElement("option");
            option.value = timeslot.id;
            option.innerText = timeslot.startTime;
            timeSelect.appendChild(option);
        });
    });

}

const addShow = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    const entries = Object.fromEntries(formData.entries())
    entries.theaterId = parseInt(entries.theaterId)
    entries.timeslotId = parseInt(entries.timeslotId)
    entries.movieId = new URLSearchParams(window.location.search).get("movie");
    entries.movieId = parseInt(entries.movieId)

    try {
        const response = await fetch(
            `${API_BASE_URL}/show`,
            { method: "POST", body: JSON.stringify(entries), headers: API_HEADERS }
        )

        const data = response.json()
        if (data) {
            window.location.reload()
        }
    } catch (error) {
        alert(error)
    }
}

function ShowtimeTableRow(show) {
    return `
    <tr>
        <td>${show.theater.name}</td>
        <td>${show.date}</td>
        <td>${show.timeslot.startTime}</td>
         <td class="actions">
            ${DeleteButton(show.id)}
      </td>
    </tr>
  `
}

document.addEventListener('DOMContentLoaded', async () =>{
    const table = document.getElementById("showtime-table-body");
    let showsContent = "";
    const movieId = new URLSearchParams(window.location.search).get("movie");

    try {
        const shows = await getShowByMovieId(movieId);
        if (shows.length > 0) {
            shows.forEach(show => {
                showsContent += ShowtimeTableRow(show);
            });
        } else {
            showsContent += EmptyContentRow(4, "No showtimes available");
        }

        table.innerHTML = showsContent;
    } catch (error) {
        console.log(error);
    }

    let popup = document.getElementById("popup");

    document.querySelector(".add-item-button").addEventListener("click", () => {
        popup.style.display = "block";
        document.getElementById("popup-title").innerText = "Add New Showtime";
        let theaterSelect = document.getElementById("input-showroom");
        let dateSelect = document.getElementById("input-date");


        let selectedTheater = null;
        let selectedDate = null;

        theaterSelect.addEventListener("change", () => {
            selectedTheater = theaterSelect.value;
            renderAvailableTimeslot(movieId, selectedTheater, selectedDate);
        });

        dateSelect.addEventListener("change", () => {
            selectedDate = dateSelect.value;
            renderAvailableTimeslot(movieId, selectedTheater, selectedDate);
        });

        dateSelect.value = new Date().toISOString().split("T")[0];
        selectedDate = dateSelect.value;

        getTheaters().then(theaters => {
            theaters.forEach(theater => {
                let option = document.createElement("option");
                option.value = theater.id;
                option.innerText = theater.name;
                theaterSelect.appendChild(option);
            });
            theaterSelect.value = theaters[0].id;
            selectedTheater = theaterSelect.value;
            renderAvailableTimeslot(movieId, selectedTheater, selectedDate);
        });
    })

    document.querySelector(".close-btn").addEventListener("click", () => {
        let theaterSelect = document.getElementById("input-showroom");
        theaterSelect.innerHTML = "";
        popup.style.display = "none";
    })

    document.getElementById("add-show-form").addEventListener("submit", addShow);
})
