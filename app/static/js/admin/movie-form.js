async function addMovie (event) {
  event.preventDefault()
  const formData = new FormData(event.target)
  const entries = Object.fromEntries(formData.entries())

  let isFormInvalid = false;
  for (const value of Object.values(entries)) {
    if (value === null || value.trim() === "") {
      isFormInvalid = true
      break; 
    }
  }

  if (isFormInvalid) {
    alert("Please complete all required fields")
    return;
  }

  entries["durationMinutes"] = parseInt(entries["durationMinutes"], 10)  // Convert durationMinutes back to numbers

  try {
    const response = await fetch(
      "http://localhost:8080/movie",
      {
        method: "POST",
        body: JSON.stringify(entries),
        headers: {
          'Content-Type': "application/json",
          'Accept': "application/json"
        }
      }
    )

    if (response.ok) {
      window.location.href = "http://localhost:8001/admin/movies.html"
    }

    if (!response.ok) {
      console.log(response)
      alert("Something is wrong. Please try again later")
    }
  } catch (error) {
    console.log(error)
    alert("Something is wrong. Please try again later")
  }
}

function setPosterPreview (event) {
  const url = event.target.value

  if (url === "") {
    document.getElementById("poster-preview").setAttribute("src", "https://placehold.co/200x300?text=Poster+Preview")
    return;
  }
  
  document.getElementById("poster-preview").setAttribute("src", url)
}

function setTrailerPreview (event) {
  const container = document.getElementById("movie-media-trailer")
  const url = event.target.value

  if (url === "") {
    const iframe = container.querySelector("iframe");
    const img = container.querySelector("img");

    if (iframe) {
      iframe.remove()
    }

    if (!img) {
      const img = document.createElement("img")
      img.setAttribute("src", "https://placehold.co/200x150?text=Trailer+Preview")
      img.setAttribute("style", "width: 200px; height: 150px;")
      container.append(img)
    }

    return;
  }

  const iframe = document.createElement("iframe") 
  iframe.setAttribute("width", "200")
  iframe.setAttribute("height", "150")
  iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade")
  iframe.setAttribute("frameborder", "0")
  iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share")
  iframe.setAttribute("src", url)

  container.querySelector("img").remove()
  container.append(iframe)
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("add-movie-form").addEventListener("submit", addMovie)
  document.getElementById("poster-url-input").addEventListener("blur", setPosterPreview)
  document.getElementById("trailer-url-input").addEventListener("blur", setTrailerPreview)
})
