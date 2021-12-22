import { parser, part1, part2, Direction } from "../../src/day2";
import { parseFromFile } from "../../src/utils/parser";

let input: Direction[];

describe("Day 2", () => {
  beforeAll(() => {
    input = parseFromFile < Direction > ("./input/day2/part1.txt", parser);
  });

  test("part1", () => {
    expect(part1(input)).toBe(1762050);
  });

  test("part2", () => {
    expect(part2(input)).toBe(1855892637);
  });
});
