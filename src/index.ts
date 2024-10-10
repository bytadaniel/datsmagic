import PF from "ric-pathfind";
import { WebSocketServer } from "ws";
import { CoordinateMap } from "./CoordinateMap";
import { Player } from "./Player";
import { Treasure } from "./points-of-interest/Treasure";
import { toCoordPath } from "./utils/to-coord-path";
import { toObstacleMatrix } from "./utils/to-obstacle-matrix";

const map = new CoordinateMap(50, 50);
const finder = new PF.AStarFinder({
  allowDiagonal: true,
});

map.setCoord(Player);
map.setCoord(Treasure);

const player = map.getPlayer();
const treasure = map.chooseTreasure();

const path = finder.findPath(
  player.x,
  player.y,
  treasure.x,
  treasure.y,
  new PF.Grid(toObstacleMatrix(map))
);

// Создаем WebSocket сервер
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Клиент подключен");

  // Отправляем карту клиенту
  ws.send(
    JSON.stringify({
      map: map.matrix,
      path: toCoordPath(path),
    })
  );

  ws.on("close", () => {
    console.log("Клиент отключен");
  });
});

console.log("WebSocket сервер запущен на ws://localhost:8080");
