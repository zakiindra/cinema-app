import { API_BASE_URL, API_HEADERS } from "./config.js"
import { DeleteButton, EditButton, EmptyContentRow } from "./sharedcomponents.js" 


// Table
const getAllPromotions = async () => {
  const response = await fetch(
    `${API_BASE_URL}/promotion`,
    { method: "GET", headers: API_HEADERS }
  )

  const data = await response.json()
  return data
}

const PromotionRow = (promotion) => {
  return `
    <tr>
      <td>${promotion.code}</td>
      <td>${promotion.promotionValue}</td>
      <td style="width: 35%;">${promotion.startTime} - ${promotion.endTime}</td>
      <td>No</td>
      <td class="actions">
        ${EditButton()}
        ${DeleteButton(promotion.id)}
      </td>
    </tr>
  `
}


// Popup
const openPopup = () => {
    document.getElementById("popup").style.display = "block";
    document.getElementById("popup-title").innerText = "Add New Promo Code";
}

const closePopup = () => {
    document.getElementById("popup").style.display = "none";
}

const addPromotion = async (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)

  const entries = Object.fromEntries(formData.entries())
  entries["promotionValue"] = parseFloat(entries["promotionValue"])
  entries["startTime"] = `${entries["startTime"]}T00:00:00`
  entries["endTime"] = `${entries["endTime"]}T00:00:00`

  try {
    const response = await fetch(
      `${API_BASE_URL}/promotion`,
      { method: "POST", body: JSON.stringify(entries), headers: API_HEADERS }
    )

    const data = response.json()
    if (data) {
      alert("Promotion added successfully")
      window.location.reload()
    }
  } catch (error) {
    alert(error)
  }
}


document.addEventListener("DOMContentLoaded", async () => {
  const promotionResponse = await getAllPromotions()
  let promotionRows = ""

  if (promotionResponse.length > 0) {
    promotionResponse.forEach(promotion => {
      promotionRows += PromotionRow(promotion)
    })
  } else {
    promotionRows += EmptyContentRow(5, "No promotion codes available")
  }
  
  document.getElementById("promotion-list-body").innerHTML = promotionRows

  document.querySelector(".add-item-button").addEventListener("click", openPopup)
  document.querySelector(".close-btn").addEventListener("click", closePopup)

  document.getElementById("promotion-form").addEventListener("submit", addPromotion)
})
