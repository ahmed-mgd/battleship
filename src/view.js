import * as Controller from "./controller";

export const BOARD_SIZE = 10;

export function markHit(player, x, y) {
  const cells = player.isUser ? userCells : cpuCells;
  cells[x][y].classList.remove("selectable");
  cells[x][y].classList.add("hit");
  cells[x][y].textContent = "X";
}

export function markMiss(player, x, y) {
  const cells = player.isUser ? userCells : cpuCells;
  cells[x][y].classList.remove("selectable");
  cells[x][y].classList.add("miss");
}

export function createCells(board) {
  const cells = new Array(BOARD_SIZE);
  for (let i = 0; i < BOARD_SIZE; i++) {
    cells[i] = new Array(BOARD_SIZE);
    for (let j = 0; j < BOARD_SIZE; j++) {
      const newCell = document.createElement("div");
      newCell.classList.add("cell");
      if (board.id === "cpu-board") {
        newCell.classList.add("selectable");
      }
      board.appendChild(newCell);
      cells[i][j] = newCell;
    }
  }
  return cells;
}

export function displayShips(player) {
  const boardModel = player.board.grid;
  const cells = player.isUser ? userCells : cpuCells;
  boardModel.forEach((row, i) => {
    row.forEach((cellModel, j) => {
      if (cellModel !== null) {
        cells[i][j].classList.add("occupied");
      }
    });
  });
}

export function startGame() {
  setupMenu.close();
  cpuCells.forEach((row, i) => {
    row.forEach((cell, j) => {
      cell.addEventListener("click", () => {
        Controller.processCellClick(i, j);
      });
    });
  });
}

export function endGame(winner) {
  winnerText.textContent = winner.isUser ? "You win!" : "You lose :(";
  gameOverScreen.showModal();
}

function resetBoards() {
  userBoardElem.replaceChildren();
  cpuBoardElem.replaceChildren();
  userCells = createCells(userBoardElem);
  cpuCells = createCells(cpuBoardElem);
}

export function reset() {
  resetBoards();
  setupMenu.showModal();
}

const startBtn = document.querySelector("#start-button");
const shuffleBtn = document.querySelector("#shuffle-button");
const setupMenu = document.querySelector("#setup-menu");
const playAgainBtn = document.querySelector("#play-again-button");
const gameOverScreen = document.querySelector("#game-over-screen");

const winnerText = document.querySelector("#winner");
const userBoardElem = document.querySelector("#user-board");
const cpuBoardElem = document.querySelector("#cpu-board");

startBtn.addEventListener("click", () => {
  Controller.processStart();
});

shuffleBtn.addEventListener("click", () => {
  Controller.processReset();
});

playAgainBtn.addEventListener("click", () => {
  gameOverScreen.close();
  Controller.processReset();
});

let userCells;
let cpuCells;
