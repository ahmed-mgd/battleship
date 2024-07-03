import * as Controller from "./controller";

const BOARD_SIZE = 10;

function markHit(cells, x, y) {
  cells[x][y].classList.add("hit");
}

function markMiss(cells, x, y) {
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

function startGame() {
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

const userBoardElem = document.querySelector("#user-board");
const cpuBoardElem = document.querySelector("#cpu-board");

let userCells;
let cpuCells;
resetBoards();
