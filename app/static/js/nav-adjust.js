import { SessionData } from "./utils/session.js";

document.addEventListener('DOMContentLoaded', () => {
    const s = new SessionData()
    const session = s.get_session()

    const navbarContent = document.getElementById('nav-content');

    if (session.id != null) {
        navbarContent.innerHTML = `
            <li><a href="http://localhost:8001/index.html">Home</a></li>
            <li><a href="http://localhost:8001/movies.html">All Movies</a></li>
            <li id="username-display" style="margin-right: 20px;">
                <span>Welcome, ${session.customerName}</span>
                <div id="user-control-popup" class="hidden">
                    <li><a href="http://localhost:8001/profile/index.html" aria-label="Edit Profile Details">Edit Profile</a></li>
                    <li><a href="http://localhost:8001/auth/logout.html" aria-label="Logout">Logout</a></li>
                </div>
            </li>
        `;
    } else {
        navbarContent.innerHTML = `
            <li><a href="http://localhost:8001/index.html">Home</a></li>
            <li><a href="http://localhost:8001/movies.html">All Movies</a></li>
            <li><a href="http://localhost:8001/auth/login.html">Login</a></li>
            <li><a href="http://localhost:8001/auth/signup.html">Signup</a></li>
        `;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const usernameDisplay = document.getElementById('username-display');
    const popupMenu = document.getElementById('user-control-popup');

    // Toggle the visibility of the popup menu
    if (popupMenu) {
        usernameDisplay.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click events from bubbling up
            popupMenu.classList.toggle('hidden');
        });
    
        // Close the popup menu when clicking outside of it
        document.addEventListener('click', (event) => {
            if (!popupMenu.classList.contains('hidden') && !usernameDisplay.contains(event.target) && !popupMenu.contains(event.target)) {
                popupMenu.classList.add('hidden');
            }
        });
    }
});