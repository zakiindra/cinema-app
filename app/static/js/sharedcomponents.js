export function NavBar() {
  return `
    <header class="bg-primary">
      <div class="logo">
          <a href="http://localhost:8001/index.html">
          <img src="http://localhost:8001/static/resources/UGA_logo_Formal_BW_MARCM-1536x502.png" alt="Logo">
          </a>
      </div>
      <nav>
          <ul>
            <li class="border-l"></li>
            <li><a href="http://localhost:8001/index.html">See Movies</a></li>
          </ul>
          <ul id="nav-content">
              <!-- Dynamic -->
          </ul>
      </nav>
    </header>
  `
}

export function DefaultNavLinks() {
  return `
    <input type="text" placeholder="Search for movies" id="search-bar" aria-label="Search Movies">
    <li class="border-l"></li>
    <li class="auth-link-box">
      <div class="rounded-box">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      </div>
      <div class="auth-link-p">
        <span><b>Join UGA Cinema!</b></span><br>
        <a href="http://localhost:8001/auth/login.html" class="auth-link">Login</a> 
        OR
        <a href="http://localhost:8001/auth/signup.html" class="auth-link">Signup</a> 
      </div>
    </li>
  `
}

export function CustomerNavLinks(customerName) {
  return `
    <input type="text" placeholder="Search for movies" id="search-bar" aria-label="Search Movies">
    <li class="border-l"></li>
    <li class="auth-link-box" id="username-display">
      <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      <div class="auth-link-p">
        <span>Welcome,</span><br>
        <b>${customerName}</b>
        <div id="user-control-popup" class="hidden">
          <p><a href="http://localhost:8001/profile/index.html">Edit Profile</a></p>
          <p><a href="http://localhost:8001/auth/logout.html">Logout</a></p>
        </div>
      </div>
  </li>
  `
}

export function MovieCard(movie) {
  const hours = Math.floor(movie.durationMinutes / 60)  // divide by 60 minutes
  const minutes = movie.durationMinutes % 60

  movie.releaseDate = new Date(movie.releaseDate)
  const readableReleaseDate = movie.releaseDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  return `
    <div class="movie-card">
      <a href="http://localhost:8001/movie-profile.html?movie-id=${movie.id}" style="text-decoration:none;">
        <img src="${movie.posterUrl}" alt="${movie.title} Poster">
      </a>
      <a href="http://localhost:8001/movie-profile.html?movie-id=${movie.id}">${movie.title}</a>
      <span>${hours} HR ${minutes} MIN | ${movie.rating}</span>
      <span>Released ${readableReleaseDate}</span>
      ${MovieActions(movie)}
    </div>
  `;
}

export function MovieActions(movie) {
  return `
      <div class="movie-actions">
          <a href="http://localhost:8001/order/select-showtime.html?movieId=${movie.id}" aria-label="Book Now">
            <button class="bg-primary-action">Book Now</button>
          </a>
          <button class="trailer-trigger" data-movie-title="${movie.title}" data-trailer-url="${movie.trailerUrl}" aria-label="Book Now">
            <svg viewBox="0 0 22 22" width="18" height="18" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </button>
      </div>
  `
}

export function BookingActions() {
  return `
      <div class="booking-actions">
          <input type="reset" value="Reset" class="bg-secondary-action">
          <input type="submit" value="Continue" class="bg-primary-action">      
      </div>
  `
}

export function FormActions(firstButtonMessage, secondButtonMessage) {
  return `
      <div class="form-actions">
<input type="reset" value="${firstButtonMessage}" class="bg-secondary-action">
<input type="submit" value="${secondButtonMessage}" class="bg-primary-action">      
      </div>
  `
}

export function EmptyContentRow(colspanNum, message) {
  return `
    <tr>
      <td colspan="${colspanNum}" style="text-align:center;">${message}</td>
    </tr>
`
}

export function SendEmailButton(id, disabled=false) {
  return `
    <button class="table-button send-email-button" data-id="${id}">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
      <span>Send</span>
    </button>
  `
}

export function EditButton(id=None) {
  return `
    <button class="table-button edit-button" data-id="${id}">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
      <span>Edit</span>
    </button>
  `
}

export function DeleteButton(id) {
  return `
    <button class="table-button delete-button" data-id="${id}">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
      </svg>
      <span>Delete</span>
    </button>
  `
}

export function TrailerPopup(movieTitle, trailerUrl) {
  return `
    <div id="preview-popup" class="preview-popup" style="display:flex;">
        <div class="preview-popup-content">
            <div class="popup-top-bar">
              <span>Trailer: ${movieTitle}</span>
              <span class="preview-close-btn">&times;</span>
            </div>
            <iframe id="preview-iframe" width="560" height="315" frameborder="0" src="${trailerUrl}" referrerpolicy="no-referrer-when-downgrade" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
    </div>
  `
}
