import { FormActions } from "./sharedcomponents.js"


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("form-actions").innerHTML = FormActions("Reset", "Submit")
})
