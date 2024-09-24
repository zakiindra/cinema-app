document.addEventListener("DOMContentLoaded", function () {
    const filterButton = document.querySelector("#dropdown-button");
    const dropdownContent = document.querySelector("#dropdown-content");
    const moviesContainer = document.getElementById("movies-container");
    const featuredContainer = document.getElementById("featured-movies-container");
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

    const FEATURED_COUNT = 5;

    // Movie data with trailers
    async function get_movies() {
        const response = await fetch("http://localhost:8080/movie")
        const data = await response.json()
        return data
    }

    // Movie data with trailers
    async function get_featured_movies() {
        const response = await fetch("http://localhost:8080/movie")
        const data = await response.json()
        return data
    }

    // Render movie cards
    function renderMovies(movies) {
        moviesContainer.innerHTML = "";
        let count = 0;

        movies.forEach(movie => {
            if (count >= FEATURED_COUNT) {
                const movieCard = `
                    <div class="movie-card" data-id="${movie.title}">
                        <img src="${movie.posterUrl}" alt="${movie.title}">
                        <h3>${movie.title}</h3>
                        <div class="movie-actions">
                            <button class="details-btn">Details</button>
                            <button class="preview-btn" data-trailer="${movie.trailerUrl}">Preview</button>
                            <button class="book-btn">Book Now</button>
                        </div>
                    </div>
                `;
                moviesContainer.innerHTML += movieCard;
            }

            count++;
        });
    }

    function renderFeaturedMovies(movies) {
        featuredContainer.innerHTML = "";
        // TODO: this is a temporary workaround until featured is implemented in api
        let count = 0;

        movies.forEach(movie => {
            if (count >= FEATURED_COUNT) return;

            const movieCard = `
                <div class="movie-card" data-id="${movie.title}">
                    <img src="${movie.posterUrl}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                    <div class="movie-actions">
                        <button class="details-btn">Details</button>
                        <button class="preview-btn" data-trailer="${movie.trailerUrl}">Preview</button>
                        <button class="book-btn">Book Now</button>
                    </div>
                </div>
            `;
            featuredContainer.innerHTML += movieCard;
            count++;
        });
    }

    get_featured_movies().then(data => {
        allMovies = data
        renderFeaturedMovies(allMovies)
    })
    
    get_movies().then(data => {
        allMovies = data
        renderMovies(allMovies)
    })

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
});
