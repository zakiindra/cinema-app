import { API_BASE_URL, API_HEADERS } from "./config.js"
import { DeleteButton, EditButton, EmptyContentRow, SendEmailButton } from "./sharedcomponents.js" 


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
      <td>${promotion.sent ? "Yes": "No"}</td>
      <td class="actions">
        ${SendEmailButton(promotion.id, promotion.sent)}
        ${EditButton(promotion.id, promotion.sent)}
        ${DeleteButton(promotion.id, promotion.sent)}
      </td>
    </tr>
  `
}


// Popup
const openPopup = async (event) => {
    const inputs = document.querySelectorAll('#promotion-form input');
    inputs.forEach(input => {
      const name = input.name
      if (name !== undefined && name !== "") {
        input.value = ""
      }
    })

    const promotionId = event.currentTarget.dataset.id

    if (promotionId) {
      const response = await fetch(`${API_BASE_URL}/promotion/${promotionId}`)
      const data = await response.json()

      console.log(data)


      inputs.forEach(input => {
        const name = input.name
        if (data[name] !== undefined) {
          let value = data[name];
          if (input.type === "date") {
            value = new Date(data[name]).toISOString().split('T')[0];
          }

          input.value = value // Set the value from the JSON object
        }
      })
    }

    document.getElementById("promotion-form").addEventListener("submit", (event) => {
      handleSubmit(event, promotionId)
    })
    document.getElementById("popup").style.display = "block";
    document.getElementById("popup-title").innerText = "Add New Promo Code";
}

const closePopup = () => {
    document.getElementById("popup").style.display = "none";
}

const handleSubmit = async (event, id=null) => {
  event.preventDefault()
  const formData = new FormData(event.target)

  const entries = Object.fromEntries(formData.entries())
  entries["promotionValue"] = parseFloat(entries["promotionValue"])
  entries["startTime"] = `${entries["startTime"]}T00:00:00`
  entries["endTime"] = `${entries["endTime"]}T00:00:00`

  try {
    let response;
    if (id) {
      response = await fetch(
        `${API_BASE_URL}/promotion/${id}`,
        { method: "PUT", body: JSON.stringify(entries), headers: API_HEADERS }
      )
    } else {
      response = await fetch(
        `${API_BASE_URL}/promotion`,
        { method: "POST", body: JSON.stringify(entries), headers: API_HEADERS }
      )
    }

    const data = response.json()
    if (data) {
      alert(id ? "Promotion edited successfully" : "Promotion added successfully")
      window.location.reload()
    }
  } catch (error) {
    alert(error)
  }
}

// Delete Promotions
const deletePromotion = async (event) => {
  event.preventDefault()

  const confirm = window.confirm("Are you sure? This action is not reversible.")
  if (!confirm) {
    return;
  }

  const promotionId = event.currentTarget.dataset.id

  const response = await fetch(
    `${API_BASE_URL}/promotion/${promotionId}`, 
    { method: "DELETE" }
  )
  const data = await response.data

  alert("Promotion deleted successfully!")

  window.location.reload()
}

// Send Email for Promotions
const sendEmailForPromotion = async (event) => {
  event.preventDefault() 

  const confirm = window.confirm("Are you sure? This action is not reversible.")
  if (!confirm) {
    return;
  }

  const promotionId = event.currentTarget.dataset.id

  const response = await fetch(`${API_BASE_URL}/promotion/${promotionId}/send-email`)

  alert("Promotion sent successfully!")

  window.location.reload()
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


  const editButtons = document.querySelectorAll(".edit-button")
  editButtons.forEach(button => {
    button.addEventListener("click", openPopup)
  })

  const deleteButtons = document.querySelectorAll(".delete-button")
  deleteButtons.forEach(button => {
    button.addEventListener("click", deletePromotion)
  })

  const promotionButtons = document.querySelectorAll(".send-email-button")
  promotionButtons.forEach(button => {
    button.addEventListener("click", sendEmailForPromotion)
  })
})
