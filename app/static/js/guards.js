import { SessionData } from "./utils/session.js";

export function ensureAuthenticated() {
    const sessionData = new SessionData()
    const session = sessionData.get_session()

    if (session.id == null) { // notes(zaki): if customer_id does not exists, then go to login page.
        window.location.href = "http://localhost:8001/auth/login.html";
    }

    return session
}

export function ensureAdmin() {
    // TODO: Implementation
}