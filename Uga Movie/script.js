document.addEventListener("DOMContentLoaded", () => {
    const featuredMoviesContainer = document.getElementById("all-movies-container");
    const upcomingMoviesContainer = document.getElementById("upcoming-container");
    const popup = document.getElementById("popup");
    const closeBtn = popup.querySelector(".close-btn");
    const popupTitle = document.getElementById("popup-title");
    const popupInfo = document.querySelector("#popup-details");
    const previewPopup = document.getElementById("preview-popup");
    const previewCloseBtn = previewPopup.querySelector(".preview-close-btn");
    const previewIframe = previewPopup.querySelector("iframe");

    // Fetch featured movies from an API
    async function fetchFeaturedMovies() {
        try {
            const response = await fetch('YOUR_FEATURED_MOVIES_API_ENDPOINT'); // Replace with actual API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const featuredMovies = await response.json(); // Assuming the API returns an array of movie objects
            renderMovies(featuredMovies.slice(0, 4), featuredMoviesContainer); // Limit to max 4
        } catch (error) {
            console.error('Error fetching featured movies:', error);
            // Handle error (e.g., display a message or fallback content)
        }
    }

    // Fetch upcoming movies from an API
    async function fetchUpcomingMovies() {
        try {
            const response = await fetch('YOUR_UPCOMING_MOVIES_API_ENDPOINT'); // Replace with actual API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const upcomingMovies = await response.json(); // Assuming the API returns an array of movie objects
            renderMovies(upcomingMovies.slice(0, 4), upcomingMoviesContainer); // Limit to max 4
        } catch (error) {
            console.error('Error fetching upcoming movies:', error);
            // Handle error (e.g., display a message or fallback content)
        }
    }

    // Render movie cards with a maximum of 4
    function renderMovies(movies, container) {
        container.innerHTML = "";
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
            movieCard.querySelector(".book-now").addEventListener("click", () => {
                bookNow(movie);
            });
            container.appendChild(movieCard);
        });
    }

    // Open movie details popup
    function openPopup(movie) {
        popupTitle.textContent = movie.title;
        popup.querySelector("#popup-cast").textContent = movie.cast;
        popup.querySelector("#popup-director").textContent = movie.director;
        popup.querySelector("#popup-duration").textContent = movie.length;
        popup.querySelector("#popup-genre").textContent = movie.genre;
        popup.querySelector("#popup-release-date").textContent = movie.releaseDate;
        popup.classList.add('active'); // Use class to control visibility
    }

    // Open trailer preview popup
    function openPreviewPopup(movie) {
        previewIframe.src = movie.trailerUrl;
        previewPopup.classList.add('active'); // Show the preview popup
    }

    // Book now (just an example function)
    function bookNow(movie) {
        alert(`Booking for ${movie.title}`);
    }

    // Close popup
    closeBtn.addEventListener("click", () => {
        popup.classList.remove('active'); 
    });

    // Close trailer preview popup
    previewCloseBtn.addEventListener("click", () => {
        previewPopup.classList.remove('active'); 
        previewIframe.src = ""; 
    });

    // Close popup when clicking outside
    document.addEventListener("click", (event) => {
        if (popup.classList.contains("active") && !popup.contains(event.target) && !event.target.matches(".view-details")) {
            popup.classList.remove('active');
        }

        if (previewPopup.classList.contains("active") && !previewPopup.contains(event.target) && !event.target.matches(".preview")) {
            previewPopup.classList.remove('active');
            previewIframe.src = ""; 
        }
    });

    // Initialize movie cards by fetching from backend
    fetchFeaturedMovies(); 
    fetchUpcomingMovies(); 
});
