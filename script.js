const gameArea = document.getElementById('gameArea');
const scoreboard = document.getElementById('scoreboard');
const colors = ['red', 'green', 'yellow'];
let players = {};
let currentPlayerId = null; // Хранит ID текущего игрока

// Функция для создания игрового поля
function createGrid() {
    for (let i = 0; i < 10000; i++) { // 100 x 100 = 10000 ячеек
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(cell));
        gameArea.appendChild(cell);
    }
}

// Функция для обработки клика по ячейке
function handleCellClick(cell) {
    if (currentPlayerId) {
        // Изменяем цвет ячейки на цвет текущего игрока
        cell.style.backgroundColor = players[currentPlayerId].color;
        players[currentPlayerId].score += 1; // Увеличиваем счет текущего игрока
        updateScoreboard(); // Обновляем счетчик
    }
}

// Функция для обновления счетчика игроков
function updateScoreboard() {
    scoreboard.innerHTML = '';
    // Создаем сортированный массив игроков по убыванию их счетов
    const sortedPlayers = Object.entries(players).sort((a, b) => b[1].score - a[1].score);
    for (const [player, data] of sortedPlayers) {
        const scoreEntry = document.createElement('div');
        scoreEntry.textContent = `${player}: ${data.score}`;
        scoreboard.appendChild(scoreEntry);
    }
}

// Запрос имени игрока при входе в игру
function initializePlayer() {
    const playerId = prompt("Введите ваше имя:"); // Запрашиваем имя игрока
    if (playerId && !players[playerId]) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        players[playerId] = { color: color, score: 0 }; // Присваиваем игроку цвет и счет
        currentPlayerId = playerId; // Устанавливаем текущего игрока
        updateScoreboard(); // Обновляем счетчик
    } else {
        alert("Имя пользователя уже занято или не указано. Попробуйте снова."); // Сообщаем об ошибке
        initializePlayer(); // Запускаем повторный запрос имени игрока
    }
}

// Инициализация игры
initializePlayer();
createGrid();
