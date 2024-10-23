document.addEventListener("DOMContentLoaded", function () {
    // Fetch movies from the backend API
    fetch('/movie', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        displayMovies(data); 
    })
    .catch(error => console.error('Error fetching movie data:', error));

    
    function displayMovies(movies) {
        const moviesContainer = document.getElementById('all-movies-container');
        moviesContainer.innerHTML = ''; 

        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');

            
            const posterUrl = movie.posterUrl ? movie.posterUrl : 'default-poster.jpg';

            movieCard.innerHTML = `
                <img src="${posterUrl}" alt="${movie.title} poster">
                <h3>${movie.title}</h3>
                <div class="ratings">${movie.rating} | ${movie.genre}</div>
                <div class="movie-actions">
                    <button onclick="showDetails(${movie.id})">Details</button>
                    <button onclick="previewTrailer('${movie.trailerUrl}')">Watch Trailer</button>
                </div>
            `;

            moviesContainer.appendChild(movieCard);
        });
    }
});


function showDetails(movieId) {
    fetch(`/movie/${movieId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(movie => {
        const popup = document.getElementById('popup');
        const popupTitle = document.getElementById('popup-title');
        const popupInfo = popup.querySelector('.popup-info');
        
        popupTitle.innerText = movie.title;
        popupInfo.innerHTML = `
            <p>${movie.description}</p>
            <p><strong>Duration:</strong> ${movie.durationMinutes} minutes</p>
            <p><strong>Release Date:</strong> ${new Date(movie.releaseDate).toDateString()}</p>
        `;

        popup.style.display = 'block'; 
    })
    .catch(error => console.error('Error fetching movie details:', error));
}


function previewTrailer(trailerUrl) {
    const previewPopup = document.getElementById('preview-popup');
    const iframe = document.getElementById('preview-iframe');

    iframe.src = trailerUrl;
    previewPopup.style.display = 'block'; 
}


document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('popup').style.display = 'none';
        document.getElementById('preview-popup').style.display = 'none';
        document.getElementById('preview-iframe').src = ''; 
    });
});
