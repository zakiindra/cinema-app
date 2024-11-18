import { DeleteButton } from "./sharedcomponents.js"

function SeatSummaryRow() {
  return `
    <tr>
      <td>A1</td>
      <td>Adult</td>
      <td>$10</td>
      <td class="actions">
        ${DeleteButton()}
      </td>
    </tr>
  `
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("seat-summary-list").innerHTML = SeatSummaryRow()
})
