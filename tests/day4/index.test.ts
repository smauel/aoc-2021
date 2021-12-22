import { part1, part2 } from "../../src/day4";
import { readFromFile } from "../../src/utils/parser";

let example: string;
let input1: string;

describe("Day 4", () => {
  beforeAll(() => {
    example = readFromFile("./input/day4/example.txt");
    input1 = readFromFile("./input/day4/part1.txt");
  });

  describe("Part 1", () => {
    test("example", () => {
      expect(part1(example)).toBe(4512);
    });

    test("part1", () => {
      expect(part1(input1)).toBe(38913);
    });
  });

  xdescribe("Part 2", () => {
    test("example", () => {
      expect(part2(example)).toBe(1924);
    });
  });
});
