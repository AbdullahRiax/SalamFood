const sum = require("../sum");

test("sum adds two positive numbers", () => {
  const result = sum(3, 4);

  expect(result).toBe(7);
});

test("sum adds a number with zero", () => {
  expect(sum(5, 0)).toBe(5);
});

test("sum adds negative numbers", () => {
  expect(sum(-2, -3)).toBe(-5);
});
