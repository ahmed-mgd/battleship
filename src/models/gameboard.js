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
    this.grid = new Array(BOARD_SIZE).fill(
      new Array(BOARD_SIZE).fill(CellStates.UNOCCUPIED)
    );
    this.ships = createShips();
  }

  createShips() {
    let ships = [];
    const numClasses = 5;
    const sizes = [5, 4, 3, 3, 2];
    for (let numShips = 1; i <= numClasses; numShips++) {
      for (let i = 0; i < numShips; i++) {
        ships.push(new Ship(numShips - 1));
      }
    }
    return ships;
  }

  placeShip(ship, minX, minY) {
    let squaresLeft = ship.length;
    let currentX = minX;
    let currentY = minY;

    while (ship.vertical && squaresLeft > 0) {
      this.grid[currentX][currentY] = ship;
      currentY++;
      squaresLeft--;
    }
    while (squaresLeft > 0) {
      this.grid[currentX][currentY] = ship;
      currentX++;
      squaresLeft--;
    }
  }

  receiveAttack(x, y) {
    const cell = this.grid[x][y];
    if (cell === CellStates.HIT || cell === CellStates.MISS) return;

    if (cell === CellStates.UNOCCUPIED) {
      cell = CellStates.MISS;
    } else {
      cell.hit();
      cell = CellStates.HIT;
    }
  }

  allShipsSunk() {
    this.ships.forEach((ship) => {
      if (!ship.isSunk()) return false;
    });
    return true;
  }
}

export default Gameboard;
