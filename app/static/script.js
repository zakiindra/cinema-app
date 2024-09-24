document.addEventListener("DOMContentLoaded", function () {
    // const filterButton = document.querySelector("#dropdown-button");
    // const dropdownContent = document.querySelector("#dropdown-content");
    // const searchInput = document.getElementById("search-bar");

    const moviesContainer = document.getElementById("upcoming-movies");
    const featuredContainer = document.getElementById("now-playing-movies");

    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popup-title");
    const popupInfo = document.querySelector(".popup-info");
    const closeBtn = document.querySelector(".close-btn");

    const previewPopup = document.getElementById("preview-popup");
    const previewCloseBtn = document.querySelector(".preview-close-btn");
    const previewIframe = previewPopup.querySelector("iframe");

    const FEATURED_COUNT = 5;

    // Movie data with trailers
    async function get_movies() {
        const response = await fetch("http://localhost:8080/movie")
        const data = await response.json();
        return data
    }

    // Movie data with trailers
    async function get_featured_movies() {
        const response = await fetch("http://localhost:8080/movie")
        const data = await response.json();
        return data
    }

    // Render movie cards
    function renderMovies(movies) {
        moviesContainer.innerHTML = "";
        let count = 0;

        movies.forEach(movie => {
            if (count >= FEATURED_COUNT) {
                const movieCard = document.createElement("div");
                movieCard.className = "movie-card";
                movieCard.innerHTML = `
                    <img src="${movie.posterUrl}" alt="${movie.title} Poster">
                    <h3>${movie.title}</h3>
                    <div class="movie-actions">
                        <button class="preview" data-title="${movie.title}" aria-label="Preview Trailer">Preview</button>
                        <button class="view-details" data-title="${movie.title}" aria-label="View Details">Details</button>
<!--                        <button class="book-now" data-title="${movie.title}" aria-label="Book Now">Book Now</button>-->
                    </div>
                `;
                movieCard.querySelector(".view-details").addEventListener("click", () => {
                    openPopup(movie);
                });
                movieCard.querySelector(".preview").addEventListener("click", () => {
                    openPreviewPopup(movie);
                });
                moviesContainer.appendChild(movieCard);
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

            const movieCard = document.createElement("div");
            movieCard.className = "movie-card";
            movieCard.innerHTML = `
                <img src="${movie.posterUrl}" alt="${movie.title} Poster">
                <h3>${movie.title}</h3>
                <div class="movie-actions">
                    <button class="preview" data-title="${movie.title}" aria-label="Preview Trailer">Preview</button>
                    <button class="view-details" data-title="${movie.title}" aria-label="View Details">Details</button>
                    <button class="book-now" data-title="${movie.title}" aria-label="Book Now">Book Now</button>
                </div>
            `;
            movieCard.querySelector(".view-details").addEventListener("click", () => {
                openPopup(movie);
            });
            movieCard.querySelector(".preview").addEventListener("click", () => {
                openPreviewPopup(movie);
            });
            featuredContainer.appendChild(movieCard);
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

    // Open movie details popup
    function openPopup(movie) {
        popupTitle.textContent = movie.title;
        popupInfo.innerHTML = `
            <p><span>Genre:</span> ${movie.genre}</p>
            <p><span>Rating:</span> ${movie.rating}</p>
            <p><span>Duration:</span> ${movie.durationMinutes}</p>
            <p><span>Release Date:</span> ${movie.releaseDate}</p>
<!--            <p><span>Cast:</span> ${movie.cast}</p>-->
<!--            <p><span>Director:</span> ${movie.director}</p>-->
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

    // // Toggle filter options
    // filterButton.addEventListener("click", () => {
    //     dropdownContent.classList.toggle("show");
    // });
    //
    // // Filter movies based on genre
    // dropdownContent.addEventListener("click", (event) => {
    //     const genre = event.target.getAttribute("data-genre");
    //     if (genre) {
    //         if (genre === "all") {
    //             renderMovies(movies);
    //         } else {
    //             const filteredMovies = movies.filter(movie => movie.genre.toLowerCase() === genre);
    //             renderMovies(filteredMovies);
    //         }
    //         dropdownContent.classList.remove("show");
    //     }
    // });

    // // Search movies based on query
    // searchInput.addEventListener("input", () => {
    //     const query = searchInput.value.toLowerCase();
    //     const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query));
    //     renderMovies(filteredMovies);
    // });

});
