// Функція для отримання даних від користувача
function userInput() {
    let country = prompt("Dear user! \n Please enter the shipping country:");
    while (!country) {
        alert("Please enter the name of the shipping country.");
        country = prompt("Dear user! \n Please enter the shipping country:");
    }
    let price = isValidNumber("Dear user! \n Please enter the total cost of your goods:");
    let deliveryFee = isValidNumber("Dear user! \n Please enter the delivery fee:");
    let message = getShippingMessage(country, price, deliveryFee);
    console.log(message);
}

// Функція для перевірки, чи є введене значення дійсним числом
function isValidNumber(promptMessage) {
    let value;
    while (true) {
        value = Number(prompt(promptMessage));
        if (!isNaN(value) && value > 0 && value !== null && value) {
            return value;
        }
        console.log("Please enter only valid numbers (positive numbers).");
    }
}

// Функція для формування повідомлення про доставку
function getShippingMessage(country, price, deliveryFee) {
     // Формуємо і повертаємо рядок з інформацією про вартість доставки
    return `Shipping to ${country} will cost ${price + deliveryFee} credits`;
}
