import Gameboard from "./models/gameboard";
import Player from "./models/player";
import * as View from "./view";

const CPU_DELAY = 500;
const SHIP_LENGTHS = [5, 4, 3, 3, 2];

function canPlaceShip(player, length, minX, minY, isVertical) {
  let squaresLeft = length;
  let currentX = minX;
  let currentY = minY;
  while (isVertical && squaresLeft > 0) {
    if (player.board.grid[currentX][currentY] !== null) return false;
    currentY++;
    squaresLeft--;
  }
  while (squaresLeft > 0) {
    if (player.board.grid[currentX][currentY] !== null) return false;
    currentX++;
    squaresLeft--;
  }
  return true;
}

function randomShipLayout(player) {
  for (let i = 0; i < SHIP_LENGTHS.length; i++) {
    let length = SHIP_LENGTHS[i];
    let randomX;
    let randomY;
    let isVertical;

    do {
      isVertical = Math.random() > 0.5;
      const anyRandom = Math.floor(Math.random() * (View.BOARD_SIZE - 1));
      const limitingRandom = Math.floor(
        Math.random() * (View.BOARD_SIZE - length)
      );
      randomX = isVertical ? anyRandom : limitingRandom;
      randomY = isVertical ? limitingRandom : anyRandom;
    } while (!canPlaceShip(player, length, randomX, randomY, isVertical));
    player.board.placeShip(length, randomX, randomY, isVertical);
  }
}

function processGameOver(winner) {
  View.endGame(winner);
}

function switchTurn() {
  userTurn = !userTurn;
}

function checkGameOver(attackedPlayer) {
  if (attackedPlayer.board.allShipsSunk()) {
    const winner = attackedPlayer.isUser ? cpu : user;
    processGameOver(winner);
    return true;
  }
  return false;
}

function updateViewPostAttack(attackedPlayer, result, x, y) {
  if (result === 0) {
    View.markMiss(attackedPlayer, x, y);
  }
  if (result === 1) {
    View.markHit(attackedPlayer, x, y);
  }
}

function cpuPlay() {
  switchTurn();

  // Inefficient. Refactor sometime in the future...
  let result;
  let randomX;
  let randomY;
  do {
    randomX = Math.floor(Math.random() * View.BOARD_SIZE);
    randomY = Math.floor(Math.random() * View.BOARD_SIZE);
    result = user.board.receiveAttack(randomX, randomY);
  } while (result === null);
  setTimeout(() => {
    updateViewPostAttack(user, result, randomX, randomY);
    checkGameOver(user);
    switchTurn();
  }, CPU_DELAY);
}

export function processReset() {
  View.reset();
  user.board = new Gameboard();
  cpu.board = new Gameboard();

  randomShipLayout(user);
  randomShipLayout(cpu);

  View.displayShips(user);
}

export function processStart() {
  View.startGame();
  // TODO: Set up CPU ships
}

export function processCellClick(x, y) {
  if (!userTurn) return;

  const result = cpu.board.receiveAttack(x, y);

  if (result !== null) {
    updateViewPostAttack(cpu, result, x, y);
    const gameOver = checkGameOver(cpu);
    if (!gameOver) cpuPlay();
  }
}

let user = new Player(true);
let cpu = new Player(false);
let userTurn = true;

document.addEventListener("DOMContentLoaded", () => {
  processReset();
});
