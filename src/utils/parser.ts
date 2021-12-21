import * as fs from "fs";

export function parseFromFile<Type>(
  path: fs.PathOrFileDescriptor,
  parser: (x: string) => Type
): Type[] {
  return fs
    .readFileSync(path, "utf8")
    .trim()
    .split("\n")
    .map((x) => parser(x));
}
