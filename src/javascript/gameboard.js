const BOARD_SIZE = 10;

class Gameboard {
  constructor() {
    this.grid = new Array(BOARD_SIZE).fill(
      new Array(BOARD_SIZE).fill(new Cell())
    );
    this.playerTurn = true;
  }

  placeShip(ship, minX, minY) {
    let squaresLeft = ship.length;
    let currentX = minX;
    let currentY = minY;

    while (ship.vertical && squaresLeft > 0) {
      this.grid[currentX][currentY].occupant = ship;
      currentY++;
      squaresLeft--;
    }
    while (squaresLeft > 0) {
      currentX++;
      squaresLeft--;
    }
  }

  receiveAttack(x, y) {
    this.grid[x][y].processAttack();
  }

  allShipsSunk() {}
}
