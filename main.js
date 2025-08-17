const secretWord = "Архив";
const questPassword = "42";
let isDecoding = false;

// Массив насмешливых сообщений
const taunts = [
    "Гуманитарий? Base64 требует точности!",
    "Даже архивный скрипт справился бы лучше!",
    "Вы уверены, что это Base64? Не похоже...",
    "В архивах такие ошибки не прощают!",
    "Может, оставите декодирование профессионалам?",
    "Шифр повреждён... или это ваши навыки?",
    "Архивариусы смеются над вашей попыткой!",
    "Base64 - это не иероглифы, тут есть правила!"
];

// Массив заголовков для насмешек
const tauntTitles = [
    "Позор архивариуса!",
    "Ошибка новичка!",
    "Неудачная попытка!",
    "Стыд и срам!",
    "Фатальная ошибка!"
];

// Функция для запуска квеста
function startSecretQuest() {
    console.log("%cСекретный код: 42", "color: red; font-size: 20px; font-weight: bold;");
    console.log("%cВведите этот код в поле на экране, затем выполните в консоли:", "color: blue; font-size: 16px;");
    // console.log("%cdecodeSecret('ваш_ответ')", "color: green; font-size: 16px; font-family: monospace;");
    
    document.getElementById('questModal').style.display = 'block';
}

// Функция проверки кода квеста
function checkQuestCode() {
    const input = document.getElementById('questCode').value;
    if (input === questPassword) {
        alert("Правильно! Теперь введите в консоли: decodeSecret('ответ в коде сайта')");
        closeQuestModal();
    } else {
        alert("Неверный код! Попробуйте еще раз.");
    }
}

// Функция для закрытия модального окна квеста
function closeQuestModal() {
    document.getElementById('questModal').style.display = 'none';
}

// Секретная функция для выполнения в консоли
function decodeSecret(answer) {
    if (answer === "ответ в коде сайта") {
        try {
            // Кодируем UTF-8 строку в Base64 правильно
            const utf8Text = "Поздравляем! Вы нашли секрет архивариуса!";
            const encoded = btoa(unescape(encodeURIComponent(utf8Text)));
            alert(`Ваш секретный ключ: напиши автору в лс телеги ответ на главный вопрос. В чем смысл жизни?`);
            return encoded;
        } catch (e) {
            console.error("Ошибка кодирования:", e);
            return false;
        }
    } else {
        console.log("Неверный ответ! Попробуйте еще раз.");
        return false;
    }
}

// Остальные функции
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

function startDecoding() {
    if (isDecoding) return;
    isDecoding = true;
    
    const animation = document.getElementById('decodingAnimation');
    animation.classList.add('active');
    
    setTimeout(() => {
        decodeFromBase64();
        animation.classList.remove('active');
        isDecoding = false;
    }, 2000);
}

function encodeToBase64() {
    const input = document.getElementById('textInput').value;
    const resultElement = document.getElementById('encodeResult');
    
    try {
        if (!input) {
            throw new Error('Введите текст для кодирования');
        }
        
        const encodedText = btoa(unescape(encodeURIComponent(input)));
        resultElement.textContent = encodedText;
        
    } catch (error) {
        resultElement.textContent = 'ОШИБКА: ' + error.message;
    }
}

function decodeFromBase64() {
    const input = document.getElementById('base64Input').value.trim();
    const resultElement = document.getElementById('decodeResult');
    
    try {
        if (!input) {
            throw new Error('Введите Base64 строку');
        }
        
        if (!/^[A-Za-z0-9+/=]+$/.test(input)) {
            showRandomTaunt();
            throw new Error('Неверный формат Base64');
        }
        
        const decodedText = decodeURIComponent(escape(atob(input)));
        resultElement.textContent = decodedText;
        
        if (decodedText === secretWord) {
            document.getElementById('successMessage').style.display = 'block';
        }
        
    } catch (error) {
        resultElement.textContent = 'ОШИБКА: ' + error.message;
        if (input && error.message !== 'Введите Base64 строку') {
            setTimeout(showRandomTaunt, 500);
        }
    }
}

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

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('encodeTab').style.display = 'none';
    document.getElementById('encodeTabBtn').style.display = 'none';
});
