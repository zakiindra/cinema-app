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

export async function ensureCreditCardSlotAvailable() {
    const sd = new SessionData()
    const ses = sd.get_session()
    
    // fetch(
    //     `http://localhost:8080/customer/${ses.id}/creditCard`,
    //     { 
    //         method: "GET", 
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         }
    //     }
    // ).then((data) => {
    //     if (data.length == 4) {
    //         return false
    //     }

    //     return true
    // }).catch(e => {
    //     console.log(e)
    // })

    try {
        const response = await fetch(
            `http://localhost:8080/customer/${ses.id}/creditCard`,
            { 
                method: "GET", 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )

        const data = await response.json();

        if (data.length == 4) {
            return false
        }

        return true
    } catch (error) {
        console.log(error)
    }
}