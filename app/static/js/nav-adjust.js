function updateNavigation() {
    const customer_id = sessionStorage.getItem("customer_id");
    const customer_name = sessionStorage.getItem("customer_name");

    const navbarContent = document.getElementById('nav-content');

    if (customer_id != null) {
        navbarContent.innerHTML = `
            <li><a href="http://localhost:8001/index.html">Home</a></li>
            <li><a href="http://localhost:8001/movies.html">All Movies</a></li>
            <li id="username-display" style="margin-right: 20px;">Welcome, ${customer_name}</li>
            <div>
                <li><a href="http://localhost:8001/profile/index.html" aria-label="Edit Profile Details">Edit Profile</a></li>
                <li><a href="http://localhost:8001/auth/logout.html" aria-label="Logout">Logout</a></li>
            </div>
        `;
    } else {
        navbarContent.innerHTML = `
            <li><a href="http://localhost:8001/index.html">Home</a></li>
            <li><a href="http://localhost:8001/movies.html">All Movies</a></li>
            <li><a href="http://localhost:8001/auth/login.html">Login</a></li>
            <li><a href="http://localhost:8001/auth/signup.html">Signup</a></li>
        `;
    }
}

document.addEventListener('DOMContentLoaded', updateNavigation);