function handleNewPaymentMethod(event) {
    event.preventDefault()

    const form = event.target;  // 'event.target' refers to the form element
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());

    fetch(
        'http://localhost:8080/customer/1/creditCard', 
        {
            method: 'POST',
            body: JSON.stringify(formDataObj),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        }
    ).then((data) => {
        console.log(data)
    }).catch((e) => {
        console.log(e)
    });
}