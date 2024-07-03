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

  // DEPRECATED
  createShips() {
    let ships = [];
    const numClasses = 5;
    const sizes = [5, 4, 3, 3, 2];
    for (let numShips = 1; numShips <= numClasses; numShips++) {
      for (let i = 0; i < numShips; i++) {
        ships.push(new Ship(sizes[numShips - 1]));
      }
    }
    return ships;
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
    this.ships.forEach((ship) => {
      if (!ship.isSunk()) return false;
    });
    return true;
  }
}

export default Gameboard;
