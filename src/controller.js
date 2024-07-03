import Gameboard from "./models/gameboard";
import Player from "./models/player"
import * as View from "./view";

export function processReset() {
    View.reset();
    user.board = new Gameboard();
    cpu.board = new Gameboard();

    /**
     * Temporary ship placement.
     */
    for (let i = 0; i < 10; i++) {
        user.board.placeShip(2, i, 0, true);
        cpu.board.placeShip(2, i, 0, true);
    }
}
function endGame() {
    // Display game end message
}
export function processStart() {
    View.startGame();
    // TODO: Set up CPU ships
}
export function processCellClick(x, y) {
    const result = cpu.board.receiveAttack(x, y);
    if (result === 0) {
        View.markMiss(cpu, x, y);
    }
    if (result === 1) {
        View.markHit(cpu, x, y);
        if (cpu.board.allShipsSunk()) {
            endGame();
        }
    }
}

let user = new Player(true);
let cpu = new Player(false);

document.addEventListener("DOMContentLoaded", () => {
  processReset();
});
