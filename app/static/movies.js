document.addEventListener("DOMContentLoaded", function () {
    const allMoviesContainer = document.getElementById('all-movies-container');
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupDescription = document.getElementById('popup-description');
    const closeBtn = document.querySelector('.close-btn');

    const allMovies = [
        { title: "Movie 1", imageUrl: "https://via.placeholder.com/200x300", description: "Description for Movie 1" },
        { title: "Movie 2", imageUrl: "https://via.placeholder.com/200x300", description: "Description for Movie 2" },
        { title: "Movie 3", imageUrl: "https://via.placeholder.com/200x300", description: "Description for Movie 3" },
        { title: "Movie 4", imageUrl: "https://via.placeholder.com/200x300", description: "Description for Movie 4" },
        { title: "Movie 5", imageUrl: "https://via.placeholder.com/200x300", description: "Description for Movie 5" },
        { title: "Movie 6", imageUrl: "https://via.placeholder.com/200x300", description: "Description for Movie 6" }
    ];

    // Display all movies
    allMovies.forEach(movie => {
        const movieCard = `
            <div class="movie-card">
                <img src="${movie.imageUrl}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <div class="movie-actions">
                    <button class="details-btn" data-title="${movie.title}" data-description="${movie.description}">Details</button>
                    <button class="preview-btn">Preview</button>
                    <button class="book-btn">Book Now</button>
                </div>
            </div>
        `;
        allMoviesContainer.innerHTML += movieCard;
    });

    // Show popup
    allMoviesContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('details-btn')) {
            const title = event.target.getAttribute('data-title');
            const description = event.target.getAttribute('data-description');
            popupTitle.textContent = title;
            popupDescription.textContent = description;
            popup.style.display = 'block';
        }
    });

    // Hide popup
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});
