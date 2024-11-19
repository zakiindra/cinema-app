export class SessionData {
    constructor() {
        this.id = localStorage.getItem("customer_id") || sessionStorage.getItem("customer_id") || null;
        this.customerName = localStorage.getItem("customer_name") || sessionStorage.getItem("customer_name") || null;
        this.rememberMe = !!localStorage.getItem("customer_id"); // true if in localStorage
        this.userType = localStorage.getItem("user_type") || sessionStorage.getItem("user_type") || null;
    }

    set_session(id, customerName, rememberMe = false, userType = "CUSTOMER") {
        this.id = id;
        this.customerName = customerName;
        this.rememberMe = rememberMe;
        this.userType = userType;

        if (rememberMe) {
            localStorage.setItem("customer_id", id);
            localStorage.setItem("customer_name", customerName);
            localStorage.setItem("user_type", userType);
        } else {
            sessionStorage.setItem("customer_id", id);
            sessionStorage.setItem("customer_name", customerName);
            sessionStorage.setItem("user_type", userType);
        }
    }
    
    get_session() {
        return {
            id: this.id,
            customerName: this.customerName,
            rememberMe: this.rememberMe,
            userType: this.userType
        };
    }

    clear() {
        this.id = null
        this.customerName = null
        this.rememberMe = false
        this.userType = null

        localStorage.clear()
        sessionStorage.clear()
    }
}