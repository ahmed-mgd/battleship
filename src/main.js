import "./style.css";

import Gameboard from "./models/gameboard";
import Ship from "./models/ship";

function newGame() {
  playerBoard = new Gameboard();
  cpuBoard = new Gameboard();
}

let playerBoard;
let cpuBoard;

newGame();
