/**
 * DEPRECATED FILE
 */

const States = {
  UNOCCUPIED: Symbol("unoccupied"),
  OCCUPIED: Symbol("occupied"),
  MISS: Symbol("miss"),
  HIT: Symbol("hit"),
};
Object.freeze(States);

class Cell {
  constructor() {
    this.occupant = null;
    this.state = States.UNOCCUPIED;
  }

  getState() {
    return this.state;
  }

  isOccupied() {
    this.state === States.OCCUPIED;
  }

  occupy(ship) {
    this.occupant = ship;
    this.state = States.OCCUPIED;
  }

  processAttack() {
    if (this.state === States.OCCUPIED) {
      this.state = States.HIT;
      this.occupant.hit();
    }

    if (this.state === States.UNOCCUPIED) {
      this.state = States.MISS;
    }
  }
}
