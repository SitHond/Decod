// 🔑 Секретный ключ
const SECRET_KEY = "мой_супер_секретный_ключ_2";
const secretWord = "Архив";
const questPassword = "42";

// --- Массивы для насмешек ---
const taunts = [
    "Гуманитарий? AES требует точности!",
    "Даже архивный скрипт справился бы лучше!",
    "Вы уверены, что это зашифрованный текст? Не похоже...",
    "В архивах такие ошибки не прощают!",
    "Может, оставите дешифровку профессионалам?",
    "Шифр повреждён... или это ваши навыки?",
    "Архивариусы смеются над вашей попыткой!",
    "AES — это не иероглифы, тут есть правила!"
];

const tauntTitles = [
    "Позор архивариуса!",
    "Ошибка новичка!",
    "Неудачная попытка!",
    "Стыд и срам!",
    "Фатальная ошибка!"
];

// --- Секретный квест ---
function startSecretQuest() {
    console.log("%cСекретный код: 42", "color: red; font-size: 20px; font-weight: bold;");
    console.log("%cВведите этот код в поле на экране, затем выполните в консоли:", "color: blue; font-size: 16px;");
    console.log("%cunlockEncoding()", "color: green; font-size: 16px; font-family: monospace;");
    document.getElementById('questModal').style.display = 'block';
}

function checkQuestCode() {
    const input = document.getElementById('questCode').value;
    if (input === questPassword) {
        alert('Правильно! Теперь откройте консоль и введите: decodeSecret("Черный Клевер")');
        closeQuestModal();
    } else {
        alert("Неверный код! Попробуйте еще раз.");
    }
}

// Функция для вызова в консоли
function decodeSecret(answer) {
    if (answer === "Черный Клевер") {
        alert("Поздравляем! Введите в ЛС автора ответ на главный вопрос: Я начинаюсь как «Маленький Принц» в мире кода,Продолжаюсь парадоксом,что меняет суда.Ломаю я ящики,летаю в ночи,И в одиночку хату купить обещаю в ночи.");
        return true;
    } else {
        console.log("Неверный ответ! Попробуйте еще раз.");
        return false;
    }
}

function closeQuestModal() {
    document.getElementById('questModal').style.display = 'none';
}

// --- Насмешки ---
function showRandomTaunt() {
    const randomTaunt = taunts[Math.floor(Math.random() * taunts.length)];
    const randomTitle = tauntTitles[Math.floor(Math.random() * tauntTitles.length)];
    
    document.getElementById('tauntText').textContent = randomTaunt;
    document.getElementById('tauntTitle').textContent = randomTitle;
    document.getElementById('tauntMessage').style.display = 'block';
}

function closeTauntMessage() {
    document.getElementById('tauntMessage').style.display = 'none';
}

// 🔐 Шифрование (доступно только через консоль)
function encodeToAES() {
    const input = document.getElementById('textInput').value;
    const resultElement = document.getElementById('encodeResult');
    
    try {
        if (!input) throw new Error('Введите текст для кодирования');
        const encrypted = CryptoJS.AES.encrypt(input, SECRET_KEY).toString();
        resultElement.textContent = encrypted;
    } catch (error) {
        resultElement.textContent = 'ОШИБКА: ' + error.message;
    }
}

// 🔓 Дешифрование
function decodeFromAES() {
    const input = document.getElementById('base64Input').value.trim();
    const resultElement = document.getElementById('decodeResult');
    
    try {
        if (!input) throw new Error('Введите зашифрованную строку');
        const bytes = CryptoJS.AES.decrypt(input, SECRET_KEY);
        const decodedText = bytes.toString(CryptoJS.enc.Utf8);

        if (!decodedText) throw new Error("Неверный ключ или повреждённый текст");

        resultElement.textContent = decodedText;

        if (decodedText === secretWord) {
            document.getElementById('successMessage').style.display = 'block';
        }
    } catch (error) {
        resultElement.textContent = 'ОШИБКА: ' + error.message;
        if (input && error.message !== 'Введите зашифрованную строку') {
            setTimeout(showRandomTaunt, 500);
        }
    }
}

// --- Вспомогательные функции ---
function closeSuccessMessage() {
    document.getElementById('successMessage').style.display = 'none';
    switchTab('encode');
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.getElementById(tabName + 'Tab').classList.add('active');
    document.getElementById(tabName + 'TabBtn').classList.add('active');
}

function copyResult(elementId) {
    const resultElement = document.getElementById(elementId);
    const text = resultElement.textContent;
    
    if (!text) {
        alert('Нет данных для копирования');
        return;
    }
    
    navigator.clipboard.writeText(text)
        .then(() => alert('Скопировано в буфер обмена!'))
        .catch(err => alert('Ошибка: ' + err));
}

// --- Секретная функция активации кодирования ---
function unlockEncoding() {
    document.getElementById('encodeTabBtn').style.display = 'block';
    switchTab('encode');
    alert("Функция кодирования активирована! Теперь вкладка доступна.");
}

// --- Инициализация ---
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('encodeTab').classList.remove('active');
    document.getElementById('encodeTabBtn').style.display = 'none';
    console.log("%cПодсказка: ищи скрытые квесты на сайте... 😉", "color: purple; font-size: 14px;");
});
