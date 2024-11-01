// Функція для отримання даних від користувача
function userInput() {
    let quantity = isValidNumber("Dear user! \n Please enter the quantity of droids ordered:");
    let pricePerDroid = isValidNumber("Dear user! \n Please enter the price per droid:");
    let customerCredits = isValidNumber("Dear user! \n Please enter the amount of funds in the customer's account:");
    let message = makeTransaction(quantity, pricePerDroid, customerCredits);
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

function makeTransaction(quantity, pricePerDroid, customerCredits) {
    // Розрахунок загальної суми замовлення
    let totalPrice = quantity * pricePerDroid;

    // Перевірка на достатність коштів
    if (totalPrice > customerCredits) {
        return "Insufficient funds!"; // Повертаємо повідомлення про недостатність коштів
    } else {
        return `You ordered ${quantity} droids worth ${totalPrice} credits!`; // Повертаємо повідомлення з інформацією про замовлення
    }
}
