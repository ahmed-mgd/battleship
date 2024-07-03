class Ship {
  constructor(length) {
    this.length = length;
    this.numHits = 0;
    this.sunk = false;
  }

  hit() {
    this.numHits++;
  }

  isSunk() {
    return this.numHits === this.length;
  }
}

export default Ship;
