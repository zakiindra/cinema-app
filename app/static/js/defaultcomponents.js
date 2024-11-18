import { NavBar } from "./sharedcomponents.js";


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("header").replaceWith(
     document.createRange().createContextualFragment(NavBar())
  )
})
