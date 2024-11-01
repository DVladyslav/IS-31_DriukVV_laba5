// Вибір елементів з HTML-документу за їх ідентифікаторами
const currentTime = document.querySelector("#current-time"); // Відображення поточного часу
const hoursSet = document.querySelector("#hours"); // Вибір години
const minutesSet = document.querySelector("#minutes"); // Вибір хвилини
const secondsSet = document.querySelector("#seconds"); // Вибір секунди
const ampmSet = document.querySelector("#am-pm"); // Вибір AM/PM
const daySet = document.querySelector("#day"); // Вибір дня
const monthSet = document.querySelector("#month"); // Вибір місяця
const yearSet = document.querySelector("#year"); // Вибір року
const setAlarmButton = document.querySelector("#submitButton"); // Кнопка для встановлення будильника
const alarmContainer = document.querySelector("#alarms-container"); // Контейнер для будильників

// Подія, що спрацьовує при завантаженні вікна
window.addEventListener("DOMContentLoaded", (event) => {
    // Заповнення випадаючих списків значеннями
    dropDownMenu(1, 31, daySet);
    dropDownMenu(1, 12, monthSet);
    dropDownMenu(new Date().getFullYear(), new Date().getFullYear() + 5, yearSet);
    dropDownMenu(1, 12, hoursSet);
    dropDownMenu(0, 59, minutesSet);
    dropDownMenu(0, 59, secondsSet);
    // Оновлення поточного часу кожну секунду
    setInterval(getCurrentTime, 1000);
    fetchAlarm();
});

// Додавання обробника подій для кнопки встановлення будильника
setAlarmButton.addEventListener("click", getInput);

// Функція для заповнення випадаючого меню значеннями
function dropDownMenu(start, end, element) {
  for (let i = start; i <= end; i++) {
    const dropDown = document.createElement("option");
    dropDown.value = i < 10 ? "0" + i : i;
    dropDown.innerHTML = i < 10 ? "0" + i : i;
    element.appendChild(dropDown);
  }
}

// Функція для отримання поточного часу
function getCurrentTime() {
    let time = new Date();
    currentTime.innerHTML = time.toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    });
    return time.toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    });
}

// Функція для обробки введених даних будильника
function getInput(e) {
    e.preventDefault();
    // Отримання значень
    const dayValue = daySet.value;
    const monthValue = monthSet.value;
    const yearValue = yearSet.value;
    const hourValue = hoursSet.value;
    const minuteValue = minutesSet.value;
    const secondValue = secondsSet.value;
    const amPmValue = ampmSet.value;

    // Конвертація введених значень у формат дати та часу
    const alarmDateTime = convertToDateTime(
        dayValue,
        monthValue,
        yearValue,
        hourValue,
        minuteValue,
        secondValue,
        amPmValue
    );
    // Встановлення будильника
    setAlarm(alarmDateTime);
}

// Функція для конвертації значень дати та часу у формат Date
function convertToDateTime(day, month, year, hour, minute, second, amPm) {
    const date = new Date(`${year}-${month}-${day} ${hour}:${minute}:${second} ${amPm}`);
    // Повернення дати у форматі рядка
    return date.toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    });
}

// Функція для встановлення будильника
function setAlarm(time, fetching = false) {
    const alarm = setInterval(() => {
    // Перевірка, чи час будильника настав
    if (time === getCurrentTime()) {
        alert("Шановний студенте! \n Час прокидатися та йти на пари");
    }
    }, 500); // Інтервал перевірки

    addAlaramToDom(time, alarm); // Додавання будильника до DOM
    if (!fetching) {
    saveAlarm(time); // Збереження будильника, якщо це не завантаження
    }
}

// Функція для додавання будильника до DOM
function addAlaramToDom(time, intervalId) {
    const alarm = document.createElement("div"); // Створення контейнера для будильника
    alarm.classList.add("alarm", "margin-bottom", "display-flex"); // Додавання класів
    alarm.innerHTML = `
                <div class="time">${time}</div>
                <button class="btn delete-alarm" data-id=${intervalId}>Delete</button>
                `;
    const deleteButton = alarm.querySelector(".delete-alarm"); // Отримання кнопки видалення
    deleteButton.addEventListener("click", (e) => deleteAlarm(e, time, intervalId)); // Обробник подій для кнопки видалення
    // Додавання будильника на початок контейнера
    alarmContainer.prepend(alarm);
}

// Функція для перевірки існуючих будильників у локальному сховищі
function checkAlarams() {
    let alarms = [];
    const isPresent = localStorage.getItem("alarms"); // Перевірка наявності будильників у локальному сховищі
    if (isPresent) alarms = JSON.parse(isPresent); // Якщо є, парсимо їх

    return alarms; // Повертаємо масив будильників
}

// Функція для збереження нового будильника у локальному сховищі
function saveAlarm(time) {
    const alarms = checkAlarams(); // Отримуємо існуючі будильники

    alarms.push(time); // Додаємо новий будильник
    localStorage.setItem("alarms", JSON.stringify(alarms)); // Зберігаємо оновлений масив
}

// Функція для завантаження будильників з локального сховища
function fetchAlarm() {
    const alarms = checkAlarams(); // Отримуємо будильники

    alarms.forEach((time) => {
        setAlarm(time, true); // Встановлюємо кожен будильник
    });
}

// Функція для видалення будильника
function deleteAlarm(event, time, intervalId) {
    const self = event.target; // Зберігаємо контекст події

    clearInterval(intervalId); // Зупиняємо таймер будильника

    const alarm = self.parentElement; // Отримуємо батьківський елемент (контейнер будильника)
    console.log(time);

    deleteAlarmFromLocal(time); // Видаляємо будильник з локального сховища
    alarm.remove(); // Видаляємо будильник з DOM
}

// Функція для видалення будильника з локального сховища
function deleteAlarmFromLocal(time) {
    const alarms = checkAlarams(); // Отримуємо існуючі будильники

    const index = alarms.indexOf(time); // Знаходимо індекс будильника
    alarms.splice(index, 1); // Видаляємо будильник з масиву
    localStorage.setItem("alarms", JSON.stringify(alarms)); // Оновлюємо локальне сховище
}
