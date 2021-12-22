import { parser, part1, part2 } from "../../src/day1";
import { parseFromFile } from "../../src/utils/parser";

let input: number[];

describe("Day 1", () => {
  beforeAll(() => {
    input = parseFromFile<number>("./input/day1/part1.txt", parser);
  });

  test("part1", () => {
    expect(part1(input)).toBe(1162);
  });

  test("part2", () => {
    expect(part2(input)).toBe(1190);
  });
});
