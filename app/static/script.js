document.addEventListener("DOMContentLoaded", function () {
    const filterButton = document.querySelector("#dropdown-button");
    const dropdownContent = document.querySelector("#dropdown-content");
    const moviesContainer = document.getElementById("movies-container");
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popup-title");
    const popupDescription = document.getElementById("popup-description");
    const popupCast = document.getElementById("popup-cast");
    const popupDirector = document.getElementById("popup-director");
    const popupDuration = document.getElementById("popup-duration");
    const popupLength = document.getElementById("popup-length");
    const popupGenre = document.getElementById("popup-genre");
    const popupReleaseDate = document.getElementById("popup-release-date");
    const closeBtn = document.querySelector(".close-btn");

    const previewPopup = document.getElementById("preview-popup");
    const previewCloseBtn = document.querySelector(".preview-close-btn");
    const trailerVideo = document.getElementById("trailer-video");
    const searchInput = document.getElementById("search-bar");

    // Movie data with trailers
    const movies = [
        {
            title: "Movie 1",
            poster: "https://via.placeholder.com/200x300",
            description: "Description for Movie 1",
            genre: "Action",
            cast: "Actor 1, Actor 2",
            director: "Director 1",
            length: "120 min",
            releaseDate: "2024-01-01",
            trailerUrl: "https://www.youtube.com/embed/V5nkjr9C29M" // Example trailer URL
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
            const movieCard = `
                <div class="movie-card" data-id="${movie.title}">
                    <img src="${movie.poster}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                    <div class="movie-actions">
                        <button class="details-btn">Details</button>
                        <button class="preview-btn" data-trailer="${movie.trailerUrl}">Preview</button>
                        <button class="book-btn">Book Now</button>
                    </div>
                </div>
            `;
            moviesContainer.innerHTML += movieCard;
        });
    }

    // Show popup with movie details
    function openPopup(movie) {
        popupTitle.textContent = movie.title;
        popupDescription.textContent = movie.description;
        popupCast.textContent = `Cast: ${movie.cast}`;
        popupDirector.textContent = `Director: ${movie.director}`;
        popupDuration.textContent = `Duration: ${movie.length}`;
        popupLength.textContent = `Length: ${movie.length}`;
        popupGenre.textContent = `Genre: ${movie.genre}`;
        popupReleaseDate.textContent = `Release Date: ${movie.releaseDate}`;
        popup.style.display = 'block';
    }

    // Open trailer preview popup
    function openPreviewPopup(trailerUrl) {
        trailerVideo.src = trailerUrl;
        previewPopup.style.display = 'block';
    }

    // Event listeners for movie card actions
    moviesContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('details-btn')) {
            const movieCard = event.target.closest('.movie-card');
            const movieId = movieCard.getAttribute('data-id');
            const movie = movies.find(m => m.title === movieId);
            if (movie) {
                openPopup(movie);
            }
        }

        if (event.target.classList.contains('preview-btn')) {
            const trailerUrl = event.target.getAttribute('data-trailer');
            openPreviewPopup(trailerUrl);
        }
    });

    // Close popups
    closeBtn.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    previewCloseBtn.addEventListener('click', function () {
        previewPopup.style.display = 'none';
        trailerVideo.pause(); // Pause the video when the popup is closed
    });

    window.addEventListener('click', function (event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }

        if (event.target === previewPopup) {
            previewPopup.style.display = 'none';
            trailerVideo.pause(); // Pause the video when the popup is closed
        }
    });

    // Toggle filter options
    filterButton.addEventListener("click", () => {
        dropdownContent.classList.toggle("show");
    });

    // Filter movies based on genre
    dropdownContent.addEventListener("click", (event) => {
        const genre = event.target.getAttribute("data-genre");
        if (genre) {
            if (genre === "all") {
                renderMovies(movies);
            } else {
                const filteredMovies = movies.filter(movie => movie.genre.toLowerCase() === genre);
                renderMovies(filteredMovies);
            }
            dropdownContent.classList.remove("show");
        }
    });

    // Search movies based on query
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query));
        renderMovies(filteredMovies);
    });

    renderMovies(movies);
});
