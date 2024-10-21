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

    async function get_movies() {
        const response = await fetch("http://localhost:8080/movie")
        const data = await response.json()
        return data
    }

    // const allMovies = [
    //     {
    //         id: 1,
    //         title: "Inception",
    //         description: "A thief who enters the dreams of others to steal secrets from their subconscious.",
    //         duration_minutes: 148,
    //         genre: "Sci-Fi",
    //         poster_url: "https://i.ebayimg.com/00/s/MTYwMFgxMDk3/z/LlUAAOSwm8VUwoRL/$_57.JPG?set_id=880000500F",
    //         rating: "PG-13",
    //         release_date: "2010-07-16",
    //         trailer_url: "https://www.youtube.com/embed/YoHD9XEInc0?controls=0&autoplay=1",
    //         created_at: "2024-09-22 15:04:08",
    //         updated_at: "2024-09-22 15:04:08"
    //     },
    //     {
    //         id: 2,
    //         title: "Pechi",
    //         description: "Pechi is a 2024 Indian Tamil-language horror film written and directed by Ramachandran B. The film stars Gayathrie, Bala Saravanan, with Dev Ramnath and Preethi Nedumaran in supporting roles.",
    //         duration_minutes: 110,
    //         genre: "Horror",
    //         poster_url: "https://m.media-amazon.com/images/M/MV5BNzk1NTljYTAtMDUxMS00MGNiLThlZjYtNzY0MWE3YjM4MDQzXkEyXkFqcGc@._V1_.jpg",
    //         rating: "UA",
    //         release_date: "2024-08-02",
    //         trailer_url: "https://www.youtube.com/embed/a5R4qsAxIOM?controls=0&autoplay=1",
    //         created_at: "2024-09-22 15:12:08",
    //         updated_at: "2024-09-22 15:12:08"
    //     },
    //     {
    //         id: 3,
    //         title: "Notice to Quit",
    //         description: "Andy Singer, an out-of-work actor now struggling as a New York City realtor, finds his world crashing down around him when his estranged 10-year-old daughter, Anna, shows up unannounced on his doorstep in the middle of his eviction.",
    //         duration_minutes: 91,
    //         genre: "Comedy",
    //         poster_url: "https://m.media-amazon.com/images/M/MV5BODA2MDI2YzUtNzFkZS00MTQyLTg2YmQtZTBhMTk4ODRkMGU0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    //         rating: "PG-13",
    //         release_date: "2024-09-27",
    //         trailer_url: "https://www.youtube.com/embed/iYlG7QTg7TU?controls=0&autoplay=1",
    //         created_at: "2024-09-22 15:17:25",
    //         updated_at: "2024-09-22 15:17:25"
    //     },
    //     {
    //         id: 4,
    //         title: "Transformers One",
    //         description: "Brothers-in-arms Orion Pax and D-16 become sworn enemies Optimus Prime and Megatron.",
    //         duration_minutes: 111,
    //         genre: "Action",
    //         poster_url: "https://m.media-amazon.com/images/M/MV5BZWI1ZDY1YTQtMjRkNy00ZDZhLWE3OTItMTIwNzliY2Y1MTZhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    //         rating: "PG",
    //         release_date: "2024-09-20",
    //         trailer_url: "https://www.youtube.com/embed/jaVcDaozGgc?controls=0&autoplay=1",
    //         created_at: "2024-09-22 15:21:27",
    //         updated_at: "2024-09-22 15:21:27"
    //     },
    //     {
    //         id: 5,
    //         title: "A Different Man",
    //         description: "An aspiring actor undergoes a radical medical procedure to drastically transform his appearance. However, his new dream face quickly turns into a nightmare as he becomes obsessed with reclaiming what was lost.",
    //         duration_minutes: 112,
    //         genre: "Drama",
    //         poster_url: "https://m.media-amazon.com/images/M/MV5BYTQ0NDI2NzItZjNiOC00ZDc0LWJiNGMtMzZmMGM2NmVjMmJkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    //         rating: "R",
    //         release_date: "2024-09-20",
    //         trailer_url: "https://www.youtube.com/embed/_9CmC5Rmsdw?controls=0&autoplay=1",
    //         created_at: "2024-09-22 15:25:37",
    //         updated_at: "2024-09-22 15:25:37"
    //     },
    //     {
    //         id: 6,
    //         title: "Megalopolis",
    //         description: "A conflict between Cesar, a genius artist who seeks to leap into a utopian, idealistic future, and his opposition, Mayor Franklyn Cicero, who remains committed to a regressive status quo, perpetuating greed, special interests, and partisan warfare.",
    //         duration_minutes: 138,
    //         genre: "Drama",
    //         poster_url: "https://m.media-amazon.com/images/M/MV5BOTQ2MTcwODgtOTg3Yi00M2RmLWEyMDQtY2IzZmRlYzM3YzhjXkEyXkFqcGc@._V1_.jpg",
    //         rating: "R",
    //         release_date: "2024-09-27",
    //         trailer_url: "https://www.youtube.com/embed/pq6mvHZU0fc?controls=0&autoplay=1",
    //         created_at: "2024-09-22 15:55:32",
    //         updated_at: "2024-09-22 15:55:32"
    //     },
    //     {
    //         id: 7,
    //         title: "Joker: Folie à Deux",
    //         description: "Struggling with his dual identity, failed comedian Arthur Fleck meets the love of his life, Harley Quinn, while incarcerated at Arkham State Hospital.",
    //         duration_minutes: 138,
    //         genre: "Thriller",
    //         poster_url: "https://m.media-amazon.com/images/M/MV5BNTRlNmU1NzEtODNkNC00ZGM3LWFmNzQtMjBlMWRiYTcyMGRhXkEyXkFqcGc@._V1_QL75_UX190_CR0,0,190,281_.jpg",
    //         rating: "R",
    //         release_date: "2024-10-04",
    //         trailer_url: "https://www.youtube.com/embed/fiqqAI0e4Nc?controls=0&autoplay=1",
    //         created_at: "2024-09-22 15:55:32",
    //         updated_at: "2024-09-22 15:55:32"
    //     },
    //     {
    //         id: 8,
    //         title: "The Outrun",
    //         description: "After living life on the edge in London, Rona attempts to come to terms with her troubled past. She returns to the wild beauty of Scotland's Orkney Islands where she grew up, hoping to heal.",
    //         duration_minutes: 118,
    //         genre: "Drama",
    //         poster_url: "https://m.media-amazon.com/images/M/MV5BM2RmYmNmNjItZGM5My00YThmLTlkNzMtMDFhMmJlMWZjN2Q3XkEyXkFqcGc@._V1_.jpg",
    //         rating: "R",
    //         release_date: "2024-10-04",
    //         trailer_url: "https://www.youtube.com/embed/Orxdn0Q67j0?controls=0&autoplay=1",
    //         created_at: "2024-09-22 15:55:32",
    //         updated_at: "2024-09-22 15:55:32"
    //     },
    //     {
    //         id: 9,
    //         title: "Speak No Evil",
    //         description: "A dream holiday turns into a living nightmare when an American couple and their daughter spend the weekend at a British family's idyllic country estate.",
    //         duration_minutes: 110,
    //         genre: "Horror",
    //         poster_url: "https://m.media-amazon.com/images/M/MV5BMWI2OWFjNjgtOTQ2Zi00MjlmLTg2MGYtNmE4MjMyZjIzMDA0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    //         rating: "R",
    //         release_date: "2024-09-13",
    //         trailer_url: "https://www.youtube.com/embed/FjzxI6uf8H8?controls=0&autoplay=1",
    //         created_at: "2024-09-22 15:55:32",
    //         updated_at: "2024-09-22 15:55:32"
    //     },
    //     {
    //         id: 10,
    //         title: "In the Summers",
    //         description: "Siblings Violeta and Eva live in California with their mother, but every summer they travel to Las Cruces, New Mexico, to spend time with their father, Vicente. Over the course of summers, Violeta and Eva learn to appreciate their father.",
    //         duration_minutes: 95,
    //         genre: "Drama",
    //         poster_url: "https://m.media-amazon.com/images/M/MV5BMzEzNGFjMzgtZWM2NC00MjY0LWI1MWItMTQ0ZWY5ZjUwZjE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    //         rating: "NR",
    //         release_date: "2024-09-20",
    //         trailer_url: "https://m.youtube.com/watch?v=APvACC3sgU8?controls=0&autoplay=1",
    //         created_at: "2024-09-22 15:55:32",
    //         updated_at: "2024-09-22 15:55:32"
    //     },
    //     {
    //         id: 11,
    //         title: "Piece by Piece",
    //         description: "LEGO bricks tell the life story of singer/songwriter and record producer Pharrell Williams -- from his childhood in Virginia to his success in the music and fashion industry.",
    //         duration_minutes: 93,
    //         genre: "Documentary",
    //         poster_url: "https://m.media-amazon.com/images/M/MV5BMjUxMjE2YWQtY2YwMS00MTdkLTg0ZWQtMTQ0NzExY2U4NGZkXkEyXkFqcGc@._V1_UY1200_CR90,0,630,1200_AL_.jpg",
    //         rating: "PG",
    //         release_date: "2024-10-11",
    //         trailer_url: "https://www.youtube.com/embed/7Bc6trBc1kc?controls=0&autoplay=1",
    //         created_at: "2024-09-22 15:55:32",
    //         updated_at: "2024-09-22 15:55:32"
    //     },
    //     {
    //         id: 12,
    //         title: "The Apprentice",
    //         description: "In the 1970s, Donald Trump seeks independence from his father's influence. With notorious lawyer Roy Cohn's support, he enters Manhattan real estate and becomes a leader.",
    //         duration_minutes: 120,
    //         genre: "Drama",
    //         poster_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ-Q-BZPF7p49r-wKQNhzqjQWQN6YOeLLa7Q&s",
    //         rating: "R",
    //         release_date: "2024-10-11",
    //         trailer_url: "https://www.youtube.com/embed/b_a3O4-Wgp8?controls=0&autoplay=1",
    //         created_at: "2024-09-22 16:00:49",
    //         updated_at: "2024-09-22 16:00:49"
    //     },
    //     {
    //         id: 13,
    //         title: "Venom: The Last Dance",
    //         description: "Eddie Brock and Venom must make a devastating decision as they're pursued by a mysterious military man.",
    //         duration_minutes: 135,
    //         genre: "Action",
    //         poster_url: "https://m.media-amazon.com/images/M/MV5BZDMyYWU4NzItZDY0MC00ODE2LTkyYTMtMzNkNDdmYmFhZDg0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    //         rating: "R",
    //         release_date: "2024-10-25",
    //         trailer_url: "https://www.youtube.com/embed/HyIyd9joTTc?controls=0&autoplay=1",
    //         created_at: "2024-09-22 16:00:49",
    //         updated_at: "2024-09-22 16:00:49"
    //     }
    // ]

    // Render movie cards
    function renderMovies(movies) {
        moviesContainer.innerHTML = "";
        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.className = "movie-card";
            movieCard.innerHTML = `
                <img src="${movie.posterUrl}" alt="${movie.title} Poster">
                <h3>${movie.title}</h3>
                <div class="movie-actions">
                    <button class="preview" data-title="${movie.title}" aria-label="Preview Trailer">Preview</button>
                    <button class="view-details" data-title="${movie.title}" aria-label="View Details">Details</button>
<!--                    <button class="book-now" data-title="${movie.title}" aria-label="Book Now">Book Now</button>-->
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
});
