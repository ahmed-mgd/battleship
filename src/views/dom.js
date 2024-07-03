import * as Controller from "../controller";

const BOARD_SIZE = 10;

function markHit(cells, x, y) {
  cells[x][y].classList.add("hit");
}

function markMiss(cells, x, y) {
  cells[x][y].classList.add("miss");
}

function createCells(board) {
  const cells = new Array(BOARD_SIZE).fill(new Array(BOARD_SIZE));
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const newCell = document.createElement("div");
      newCell.classList.add("cell");
      board.appendChild(newCell);
      cells[i][j] = newCell;
    }
  }
  return cells;
}

function startGame() {
  cpuCells.forEach((row, i) => {
    row.forEach((cell, j) => {
      cell.addEventListener("click", () => {
        Controller.processCellClick(i, j);
      });
    });
  });
}

function reset() {}

const userBoardElem = document.querySelector("#user-board");
const cpuBoardElem = document.querySelector("#cpu-board");

let userCells = createCells(userBoardElem);
let cpuCells = createCells(cpuBoardElem);
