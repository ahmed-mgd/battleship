const UNOCCUPIED = null;
const OCCUPIED = 0;
const MISS = 1;
const HIT = 2;

class Cell {
  constructor() {
    this.x = x;
    this.y = y;
    this.occupant = null;
    this.status = UNOCCUPIED;
  }

  occupy(ship) {
    this.occupant = ship;
    this.status = OCCUPIED;
  }

  processAttack() {
    if (this.status === OCCUPIED) {
      this.status = HIT;
    }

    if (this.status === UNOCCUPIED) {
      this.status = MISS;
    }
  }
}
