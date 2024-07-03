import Gameboard from "./gameboard";
import Ship from "./ship";

const board = new Gameboard();

test("places size 5 ship vertically", () => {
  const x = 0;
  const y = 0;
  const length = 5;
  const isVertical = true;
  board.placeShip(length, x, y, isVertical);

  for (let i = 0; i < length; i++) {
    expect(board.grid[0][i]).not.toBe(null);
  }
});

test("places size 4 horizontally", () => {
  const x = 1;
  const y = 0;
  const length = 4;
  const isVertical = false;
  board.placeShip(length, x, y, isVertical);
  for (let i = 1; i < length; i++) {
    expect(board.grid[i][0]).not.toBe(null);
  }
});

test("size 5 ship receives attack", () => {
  const x = 0;
  const y = 0;
  board.receiveAttack(x, y);
  expect(board.grid[x][y]).toBe(1);
});

test("not all ships sunk", () => {
  console.log(`Hits: ${board.ships[0].numHits}, Length: ${board.ships[0].length}`);
  expect(board.allShipsSunk()).toBeFalsy();
});

test("sink all ships", () => {
  board.ships.forEach((ship, i) => {
    while (!ship.isSunk()) {
      ship.hit();
    }
  });
  expect(board.allShipsSunk()).toBeTruthy();
});
