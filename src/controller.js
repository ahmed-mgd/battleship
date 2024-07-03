import Gameboard from "./models/gameboard";
import Player from "./models/player";
import * as View from "./view";

function endGame() {
  // Display game end message
}

function switchTurn() {
  userTurn = !userTurn;
}

function checkGameOver(lastPlayer) {
  if (lastPlayer.board.allShipsSunk()) {
    endGame();
  }
}

function updateViewPostAttack(player, result, x, y) {
  if (result === 0) {
    View.markMiss(player, x, y);
  }
  if (result === 1) {
    View.markHit(player, x, y);
  }
}

function cpuPlay() {
  switchTurn();

  // Inefficient. Refactor sometime in the future...
  do {
    const randomX = Math.floor(Math.random() * View.BOARD_SIZE);
    const randomY = Math.floor(Math.random() * View.BOARD_SIZE);
    const result = user.board.receiveAttack(randomX, randomY);
  } while (result === null);

  updateViewPostAttack(user, result, x, y);
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
    checkGameOver(user);
    cpuPlay();
  }
}

let user = new Player(true);
let cpu = new Player(false);
let userTurn = true;

document.addEventListener("DOMContentLoaded", () => {
  processReset();
});
