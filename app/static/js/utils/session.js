export class SessionData {
    constructor() {
        this.id = localStorage.getItem("customer_id") || sessionStorage.getItem("customer_id") || null;
        this.customerName = localStorage.getItem("customer_name") || sessionStorage.getItem("customer_name") || null;
        this.rememberMe = !!localStorage.getItem("customer_id"); // true if in localStorage
    }

    set_session(id, customerName, rememberMe = false) {
        this.id = id;
        this.customerName = customerName;
        this.rememberMe = rememberMe;

        if (rememberMe) {
            localStorage.setItem("customer_id", id);
            localStorage.setItem("customer_name", customerName);
        } else {
            sessionStorage.setItem("customer_id", id);
            sessionStorage.setItem("customer_name", customerName);
        }
    }
    
    get_session() {
        return {
            id: this.id,
            customerName: this.customerName,
            rememberMe: this.rememberMe
        };
    }

    clear() {
        this.id = null
        this.customerName = null
        this.rememberMe = false

        localStorage.clear()
        sessionStorage.clear()
    }
}