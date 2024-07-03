import * as Controller from "./controller";

const BOARD_SIZE = 10;

function markHit(player, x, y) {
  cells[x][y].classList.add("hit");
}

function markMiss(player, x, y) {
  cells[x][y].classList.add("miss");
}

function createCells(board) {
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

function occupyCells(player) {
  const boardModel = player.board.grid;
  const cells = player.isUser() ? userCells : cpuCells;
  boardModel.forEach((row, i) => {
    row.forEach((cellModel) => {
      if (cellModel !== null) {
        cells[i][j].classList.add("occupied");
      }
    })
  })
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
const setupMenu = document.querySelector("#setup-menu");
const userBoardElem = document.querySelector("#user-board");
const cpuBoardElem = document.querySelector("#cpu-board");

startBtn.addEventListener("click", () => {
  Controller.processStart();
});

let userCells;
let cpuCells;