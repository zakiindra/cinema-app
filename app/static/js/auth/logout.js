import { SessionData } from "../utils/session.js";

function logoutUser() {
    const session = new SessionData()
    session.clear()
    
    document.cookie.split(";").forEach((cookie) => {
        const name = cookie.split("=")[0];
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    });

    
    setTimeout(() => {
        window.location.href = 'http://localhost:8001/index.html';
    }, 2000);
}


window.onload = logoutUser;