import { parser, part1, part2, Record } from "../../src/day3";
import { parseFromFile } from "../../src/utils/parser";

let example: Record[];
let input1: Record[];

describe("Day 3", () => {
  beforeAll(() => {
    example = parseFromFile<Record>("./input/day3/example.txt", parser);
    input1 = parseFromFile<Record>("./input/day3/part1.txt", parser);
  });

  describe("Part 1", () => {
    test("example", () => {
      expect(part1(example)).toBe(198);
    });

    test("part1", () => {
      expect(part1(input1)).toBe(1997414);
    });
  });

  describe("Part 2", () => {
    test("example", () => {
      expect(part2(example)).toBe(230);
    });

    test("part1", () => {
      expect(part2(input1)).toBe(1032597);
    });
  });
});
