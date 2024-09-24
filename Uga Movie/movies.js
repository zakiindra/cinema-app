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

    let allMovies = [];

    // Fetch movies from backend API
    async function fetchMovies() {
        try {
            const response = await fetch('YOUR_BACKEND_API_ENDPOINT'); // Replace with actual API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const movies = await response.json(); // Assuming API returns an array of movie objects
            allMovies = movies; // Store fetched movies in allMovies
            renderMovies(allMovies); // Render the fetched movies
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

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

        closeBtn.addEventListener("click", closePopup);
        window.addEventListener("click", closePopupOnOutsideClick);
    }

    // Close movie details popup
    function closePopup() {
        popup.style.display = "none";
        popup.setAttribute("aria-hidden", "true");
        closeBtn.removeEventListener("click", closePopup);
        window.removeEventListener("click", closePopupOnOutsideClick);
    }

    // Close popup when clicking outside of it
    function closePopupOnOutsideClick(event) {
        if (event.target === popup) {
            closePopup();
        }
    }

    // Open trailer preview popup
    function openPreviewPopup(movie) {
        const trailerUrl = movie.trailerUrl;
        if (trailerUrl.includes("youtube.com/watch")) {
            const videoId = new URL(trailerUrl).searchParams.get("v");
            previewIframe.src = `https://www.youtube.com/embed/${videoId}`;
        } else {
            previewIframe.src = trailerUrl; // Assume it's already in embed format if not YouTube
        }
        previewPopup.style.display = "flex";
        previewPopup.setAttribute("aria-hidden", "false");

        previewCloseBtn.addEventListener("click", closePreviewPopup);
        window.addEventListener("click", closePreviewPopupOnOutsideClick);
    }

    // Close trailer preview popup
    function closePreviewPopup() {
        previewPopup.style.display = "none";
        previewPopup.setAttribute("aria-hidden", "true");
        previewIframe.src = ""; 
        previewCloseBtn.removeEventListener("click", closePreviewPopup);
        window.removeEventListener("click", closePreviewPopupOnOutsideClick);
    }

    // Close preview popup when clicking outside of it
    function closePreviewPopupOnOutsideClick(event) {
        if (event.target === previewPopup) {
            closePreviewPopup();
        }
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
        }
    });

    // Search functionality
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredMovies = allMovies.filter(movie => movie.title.toLowerCase().includes(query));
        renderMovies(filteredMovies);
    });

    // Initialize by fetching movies from the backend
    fetchMovies();
});
