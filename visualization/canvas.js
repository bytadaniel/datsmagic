// Получение canvas элемента
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');

let tileSize = 10; // Изначальное значение для клетки

// Подключение к WebSocket серверу
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  console.log('Подключено к серверу');
};

// При получении данных карты
socket.onmessage = (event) => {
  const { map, path } = JSON.parse(event.data);
  adjustCanvasSize(map);
  drawMap(map);
  drawPath(path);
};

socket.onclose = () => {
  console.log('Соединение с сервером закрыто');
};

// Функция для динамической подстройки размера canvas
function adjustCanvasSize(map) {
  const mapHeight = map.length;
  const mapWidth = map[0].length;

  // Устанавливаем размер canvas на основе размеров карты
  canvas.width = mapWidth * tileSize;
  canvas.height = mapHeight * tileSize;
}

// Функция для отрисовки пути
function drawPath(path) {
  if (path.length === 0) return; // Если путь пуст, ничего не рисуем

  ctx.strokeStyle = 'red'; // Устанавливаем цвет линии для пути
  ctx.lineWidth = 1; // Толщина линии

  ctx.beginPath();
  const startTile = path[0];
  ctx.moveTo(startTile.x * tileSize + tileSize / 2, startTile.y * tileSize + tileSize / 2); // Начальная точка

  // Проходим по всем точкам пути и рисуем линии между ними
  for (let i = 1; i < path.length; i++) {
    const tile = path[i];
    ctx.lineTo(tile.x * tileSize + tileSize / 2, tile.y * tileSize + tileSize / 2); // Линия до следующей клетки
  }

  ctx.stroke(); // Рисуем линии
}


// Функция для отрисовки карты
function drawMap(map) {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем canvas перед отрисовкой
  const tileSize = Math.min(canvas.width / map[0].length, canvas.height / map.length); // Подбираем размер клетки

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const tile = map[i][j];

      const typeColor = {
        coord: 'white',
        player: 'purple',
        treasure: 'green',
        obstacle: 'gray',
        enemy: 'red',
      }

      ctx.fillStyle = typeColor[tile.type];
    

      // Рисуем клетку
      ctx.fillRect(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize);
      ctx.strokeRect(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize);
    }
  }
}
