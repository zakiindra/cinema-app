import { API_BASE_URL, API_HEADERS } from "./config.js"
import { DeleteButton, EditButton, EmptyContentRow } from "./sharedcomponents.js" 


// Table
const getAllTheaters = async () => {
  const response = await fetch(
    `${API_BASE_URL}/theater`,
    { method: "GET", headers: API_HEADERS }
  )

  const data = await response.json()
  return data
}

const TheaterRow = (theater) => {
  return `
    <tr>
      <td>${theater.name}</td>
      <td>${theater.numSeats}</td>
      <td class="actions">
        ${EditButton(theater.id, true)}
        ${DeleteButton(theater.id, true)}
      </td>
    </tr>
  `
}


// Popup
const openPopup = () => {
    document.getElementById("popup").style.display = "block";
    document.getElementById("popup-title").innerText = "Add New Theater";
}

const closePopup = () => {
    document.getElementById("popup").style.display = "none";
}

const addTheater = async (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)

  const entries = Object.fromEntries(formData.entries())
  entries["numSeats"] = parseFloat(entries["numSeats"])

  try {
    const response = await fetch(
      `${API_BASE_URL}/theater`,
      { method: "POST", body: JSON.stringify(entries), headers: API_HEADERS }
    )

    const data = response.json()
    if (data) {
      alert("Theater added successfully")
      window.location.reload()
    }
  } catch (error) {
    alert(error)
  }
}


document.addEventListener("DOMContentLoaded", async () => {
  const promotionResponse = await getAllTheaters()
  let promotionRows = ""

  if (promotionResponse.length > 0) {
    promotionResponse.forEach(promotion => {
      promotionRows += TheaterRow(promotion)
    })
  } else {
    promotionRows += EmptyContentRow(5, "No theater available")
  }
  
  document.getElementById("theater-list-body").innerHTML = promotionRows

  document.querySelector(".add-item-button").addEventListener("click", openPopup)
  document.querySelector(".close-btn").addEventListener("click", closePopup)

  document.getElementById("theater-form").addEventListener("submit", addTheater)
})
