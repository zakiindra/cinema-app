document.addEventListener("DOMContentLoaded", () => {
    const filterButton = document.querySelector("#dropdown-button");
    const dropdownContent = document.querySelector("#dropdown-content");
    const moviesContainer = document.getElementById("all-movies-container");
    const popup = document.getElementById("popup");
    const closeBtn = popup.querySelector(".close-btn");
    const popupTitle = document.getElementById("popup-title");
    const popupInfo = document.querySelector(".popup-info");
    const searchInput = document.getElementById("search-bar");
    const previewPopup = document.getElementById("preview-popup");
    const previewCloseBtn = previewPopup.querySelector(".close-btn");
    const previewIframe = previewPopup.querySelector("iframe");

    let allMovies = []; // Array to hold all movie data

    // Example movie data with trailers
    allMovies = [
        {
            title: "Movie 1",
            poster: "https://via.placeholder.com/200x300",
            description: "Description for Movie 1",
            genre: "Action",
            cast: "Actor 1, Actor 2",
            director: "Director 1",
            length: "120 min",
            releaseDate: "2024-01-01",
            trailerUrl: "https://www.youtube.com/watch?v=V5nkjr9C29M" // Example trailer URL
        },
        {
            title: "Movie 2",
            poster: "https://via.placeholder.com/200x300",
            description: "Description for Movie 2",
            genre: "Comedy",
            cast: "Actor 3, Actor 4",
            director: "Director 2",
            length: "90 min",
            releaseDate: "2024-02-01",
            trailerUrl: "https://www.youtube.com/embed/3tmd-ClpJxA" // Example trailer URL
        }
        // Add more movie objects here
    ];

    // Render movie cards
    function renderMovies(movies) {
        moviesContainer.innerHTML = "";
        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.className = "movie-card";
            movieCard.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title} Poster">
                <h3>${movie.title}</h3>
                <div class="movie-actions">
                    <button class="book-now" data-title="${movie.title}" aria-label="Book Now">Book Now</button>
                    <button class="preview" data-title="${movie.title}" aria-label="Preview Trailer">Preview</button>
                    <button class="view-details" data-title="${movie.title}" aria-label="View Details">Details</button>
                </div>
            `;
            movieCard.querySelector(".view-details").addEventListener("click", () => {
                openPopup(movie);
            });
            movieCard.querySelector(".preview").addEventListener("click", () => {
                openPreviewPopup(movie);
            });
            moviesContainer.appendChild(movieCard);
        });
    }

    // Open movie details popup
    function openPopup(movie) {
        popupTitle.textContent = movie.title;
        popupInfo.innerHTML = `
            <p><span>Genre:</span> ${movie.genre}</p>
            <p><span>Cast:</span> ${movie.cast}</p>
            <p><span>Director:</span> ${movie.director}</p>
            <p><span>Length:</span> ${movie.length}</p>
            <p><span>Release Date:</span> ${movie.releaseDate}</p>
            <p><span>Description:</span> ${movie.description}</p>
        `;
        popup.style.display = "flex";
        popup.setAttribute("aria-hidden", "false");

        closeBtn.addEventListener("click", () => {
            popup.style.display = "none";
            popup.setAttribute("aria-hidden", "true");
        });

        window.addEventListener("click", (event) => {
            if (event.target === popup) {
                popup.style.display = "none";
                popup.setAttribute("aria-hidden", "true");
            }
        });
    }

    // Open trailer preview popup
    function openPreviewPopup(movie) {
        previewIframe.src = movie.trailerUrl;
        previewPopup.style.display = "flex";
        previewPopup.setAttribute("aria-hidden", "false");

        previewCloseBtn.addEventListener("click", () => {
            previewPopup.style.display = "none";
            previewPopup.setAttribute("aria-hidden", "true");
            previewIframe.src = ""; // Stop the video when closing
        });

        window.addEventListener("click", (event) => {
            if (event.target === previewPopup) {
                previewPopup.style.display = "none";
                previewPopup.setAttribute("aria-hidden", "true");
                previewIframe.src = ""; // Stop the video when closing
            }
        });
    }

    // Toggle filter options
    filterButton.addEventListener("click", () => {
        dropdownContent.classList.toggle("show");
    });

    // Filter movies based on genre
    dropdownContent.addEventListener("click", (event) => {
        const genre = event.target.getAttribute("data-genre");
        if (genre) {
            if (genre === "all") {
                renderMovies(allMovies);
            } else {
                const filteredMovies = allMovies.filter(movie => movie.genre.toLowerCase() === genre);
                renderMovies(filteredMovies);
            }
            dropdownContent.classList.remove("show");
        }
    });

    // Search movies based on query
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredMovies = allMovies.filter(movie => movie.title.toLowerCase().includes(query));
        renderMovies(filteredMovies);
    });

    renderMovies(allMovies);
});
