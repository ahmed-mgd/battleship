import Ship from "./ship";

const length = 2;
const ship = new Ship(length);

test("ship initially not sunk", () => {
  expect(ship.isSunk()).toBeFalsy();
});

test("hit 1", () => {
  ship.hit();
  expect(ship.numHits).toBe(1);
});

test("ship not sunk after 1 hit", () => {
  expect(ship.isSunk()).toBeFalsy();
});

test("hit 2", () => {
  ship.hit();
  expect(ship.numHits).toBe(2);
});

test("ship is sunk", () => {
  expect(ship.isSunk()).toBeTruthy();
});
