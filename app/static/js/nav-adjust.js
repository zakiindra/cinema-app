import { SessionData } from "./utils/session.js";
import { DefaultNavLinks, CustomerNavLinks } from "./sharedcomponents.js";


const toggleUsernameDisplay = (event) => {
  event.stopPropagation();  // Prevent click events from bubbling up
  document.getElementById('user-control-popup').classList.toggle('hidden');
}

const closePopupOnExternalClick = (event) => {
  const usernameDisplay = document.getElementById('username-display');
  const popupMenu = document.getElementById('user-control-popup');

  if (
    !popupMenu.classList.contains('hidden') && 
    !usernameDisplay.contains(event.target) && 
    !popupMenu.contains(event.target)) {
    popupMenu.classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', () => {
    const s = new SessionData()
    const session = s.get_session()

    const navbarContent = document.getElementById('nav-content');

    if (session.id != null) { 
      navbarContent.innerHTML = CustomerNavLinks(session.customerName)
    } else {
      navbarContent.innerHTML = DefaultNavLinks()
    }

    const popupMenu = document.getElementById('user-control-popup');
    if (popupMenu) {
        document.getElementById("username-display").addEventListener("click", toggleUsernameDisplay)
        document.addEventListener("click", closePopupOnExternalClick)
    }
});
