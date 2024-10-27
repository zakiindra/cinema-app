document.addEventListener('DOMContentLoaded', function () {
    popup = document.getElementById("popup");

    document.querySelector(".new-payment-popup").addEventListener("click", () => {
        popup.style.display = "block";
        document.getElementById("popup-title").innerText = "Add New Payment Method";
    })

    document.querySelector(".close-btn").addEventListener("click", () => {
        popup.style.display = "none";
    })
})