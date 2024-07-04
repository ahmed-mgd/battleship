import { createCells } from "./view";

const board = document.querySelector("#layout-board");

class SetupBoard {
  constructor() {
    board.replaceChildren();
    this.cells = createCells(board);
    this.carrier = createShipElement(5)
    this.battleship = createShipElement(4)
    this.destroyer = createShipElement(3)
    this.submarine = createShipElement(3)
    this.patrol = createShipElement(2)
  }

  createShipElement(length) {
    const ship = document.createElement("div");
    ship.classList.add("ship");
    for (let i = 0; i < length; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
    }
  }

  isPositioned(ship) {

  }

  allShipsPositioned() {}
}

export { board };
