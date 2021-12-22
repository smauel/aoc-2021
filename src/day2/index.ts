export type Direction = {
  direction: "up" | "down" | "forward";
  amount: number;
};

export type Part1 = {
  depth: number;
  position: number;
};

export type Part2 = {
  depth: number;
  position: number;
  aim: number;
};

export function part1(values: Direction[]) {
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

export function part2(values: Direction[]) {
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

export const parser = (x: string): Direction => {
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
