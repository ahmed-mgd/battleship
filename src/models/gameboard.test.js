import Gameboard from "./gameboard";

const board = new Gameboard();

test("places size 5 ship vertically", () => {
  const x = 0;
  const y = 0;
  const ship = board.ships[0];
  board.placeShip(ship, x, y);

  for (let i = 0; i < ship.length; i++) {
    expect(board.grid[0][i]).toBe(ship);
  }
});

test("places size 4 horizontally", () => {
  const x = 1;
  const y = 0;
  const ship = board.ships[1];
  ship.vertical = false;
  board.placeShip(ship, x, y);

  for (let i = 1; i < ship.length; i++) {
    expect(board.grid[i][0]).toBe(ship);
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
