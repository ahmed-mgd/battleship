import Gameboard from "./models/gameboard";
import Player from "./models/player";
import * as View from "./view";

function processGameOver(winner) {
    View.endGame();
}

function switchTurn() {
  userTurn = !userTurn;
}

function checkGameOver(attackedPlayer) {
  if (attackedPlayer.board.allShipsSunk()) {
    const winner = attackedPlayer.isUser ? cpu : user;
    processGameOver(winner);
  }
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

  updateViewPostAttack(user, result, randomX, randomY);
  checkGameOver(user);

  switchTurn();
}

export function processReset() {
  View.reset();
  user.board = new Gameboard();
  cpu.board = new Gameboard();

  /**
   * Temporary ship placement.
   */
  for (let i = 0; i < 10; i++) {
    user.board.placeShip(2, i, 0, true);
    cpu.board.placeShip(2, i, 0, true);
  }
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
    checkGameOver(cpu);
    cpuPlay();
  }
}

let user = new Player(true);
let cpu = new Player(false);
let userTurn = true;

document.addEventListener("DOMContentLoaded", () => {
  processReset();
});
