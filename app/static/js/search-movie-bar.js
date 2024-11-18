document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("search-bar").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      window.location.href = `http://localhost:8001/search.html?q=${event.target.value}`;
    }
  })
})
