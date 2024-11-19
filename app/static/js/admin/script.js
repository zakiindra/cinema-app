import {SessionData} from "../utils/session.js";

document.addEventListener('DOMContentLoaded', () => {
    const session = new SessionData()

    const s = session.get_session();

    if (s.userType !== 'ADMIN') {
        window.location.href = 'http://localhost:8001/index.html';
    }

})