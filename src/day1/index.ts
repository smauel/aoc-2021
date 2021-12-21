import { parseFromFile } from "../utils/parser";

function windows(size: number, vals: number[]) {
  return vals.flatMap((_, i) =>
    i <= vals.length - size ? [vals.slice(i, i + size)] : []
  );
}

function part1(xs: number[]) {
  return windows(2, xs).filter(([a, b]) => a < b).length;
}

function part2(xs: number[]) {
  const sums = windows(3, xs).map(([a, b, c]) => a + b + c);
  return windows(2, sums).filter(([a, b]) => a < b).length;
}

const parser = (x: string) => parseInt(x);
const xs = parseFromFile<number>("./input/day1/part1.txt", parser);
console.log("part1: ", part1(xs));
console.log("part2: ", part2(xs));
