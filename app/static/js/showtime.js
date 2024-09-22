document.addEventListener('DOMContentLoaded', function () {
    popup = document.getElementById("popup");

    document.querySelector(".add-item-button").addEventListener("click", () => {
        popup.style.display = "block";
        document.getElementById("popup-title").innerText = "Add New Showtime";
    })

    document.querySelector(".close-btn").addEventListener("click", () => {
        popup.style.display = "none";
    })
})