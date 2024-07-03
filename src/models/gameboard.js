import Ship from "./ship";

const BOARD_SIZE = 10;

const CellStates = {
  UNOCCUPIED: null,
  MISS: 0,
  HIT: 1,
};
Object.freeze(CellStates);

class Gameboard {
  constructor() {
    this.grid = new Array(BOARD_SIZE);
    for (let i = 0; i < BOARD_SIZE; i++) {
      this.grid[i] = new Array(BOARD_SIZE).fill(CellStates.UNOCCUPIED);
    }
    this.ships = [];
  }

  placeShip(length, minX, minY, isVertical) {
    let squaresLeft = length;
    let currentX = minX;
    let currentY = minY;
    const ship = new Ship(length);

    while (isVertical && squaresLeft > 0) {
      this.grid[currentX][currentY] = ship;
      currentY++;
      squaresLeft--;
    }
    while (squaresLeft > 0) {
      this.grid[currentX][currentY] = ship;
      currentX++;
      squaresLeft--;
    }
    this.ships.push(ship);
  }

  receiveAttack(x, y) {
    const cell = this.grid[x][y];
    if (cell === CellStates.HIT || cell === CellStates.MISS) return null;

    if (cell === CellStates.UNOCCUPIED) {
      this.grid[x][y] = CellStates.MISS;
      return CellStates.MISS;
    } else {
      cell.hit();
      this.grid[x][y] = CellStates.HIT;
      return CellStates.HIT;
    }
  }

  allShipsSunk() {
    for (let ship of this.ships) {
      if (!ship.isSunk()) return false;
    }
    return true;
  }
}

export default Gameboard;
