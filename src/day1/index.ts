function windows(size: number, vals: number[]) {
  return vals.flatMap((_, i) =>
    i <= vals.length - size ? [vals.slice(i, i + size)] : []
  );
}

export const parser = (x: string) => parseInt(x);

export function part1(xs: number[]) {
  return windows(2, xs).filter(([a, b]) => a < b).length;
}

export function part2(xs: number[]) {
  const sums = windows(3, xs).map(([a, b, c]) => a + b + c);
  return windows(2, sums).filter(([a, b]) => a < b).length;
}
