import { parseFromFile } from "../utils/parser";

type Direction = {
  direction: "up" | "down" | "forward";
  amount: number;
};

type Part1 = {
  depth: number;
  position: number;
};

type Part2 = {
  depth: number;
  position: number;
  aim: number;
};

function part1(values: Direction[]) {
  const initialCount: Part1 = { depth: 0, position: 0 };

  const changes = values.reduce((acc, curr) => {
    switch (curr.direction) {
      case "up":
        return {
          depth: acc.depth - curr.amount,
          position: acc.position,
        };
      case "down":
        return {
          depth: acc.depth + curr.amount,
          position: acc.position,
        };
      case "forward":
        return {
          depth: acc.depth,
          position: acc.position + curr.amount,
        };
    }
  }, initialCount);

  return changes.depth * changes.position;
}

function part2(values: Direction[]) {
  const initialCount: Part2 = { depth: 0, position: 0, aim: 0 };

  const changes = values.reduce((acc, curr) => {
    switch (curr.direction) {
      case "up":
        return {
          depth: acc.depth,
          position: acc.position,
          aim: acc.aim - curr.amount,
        };
      case "down":
        return {
          depth: acc.depth,
          position: acc.position,
          aim: acc.aim + curr.amount,
        };
      case "forward":
        return {
          depth: acc.depth + acc.aim * curr.amount,
          position: acc.position + curr.amount,
          aim: acc.aim,
        };
    }
  }, initialCount);

  return changes.depth * changes.position;
}

const parser = (x: string): Direction => {
  const [command, amount] = x.split(" ");

  if (command !== "up" && command !== "down" && command !== "forward") {
    throw new Error(`Unable to parse command: ${x}`);
  }

  const result: Direction = {
    direction: command,
    amount: parseInt(amount),
  };

  return result;
};
const xs = parseFromFile<Direction>("./input/day2/part1.txt", parser);
console.log("part1: ", part1(xs));
console.log("part2: ", part2(xs));
