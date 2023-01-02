import { readFile } from "fs/promises";

export const read = async (url: string, filename: string) => {
  return readFile(new URL(filename, url), `utf-8`);
  // return file.split(`\n`); no splitting since some challenges have only string as an input
};
export const readExample = async (url: string) => read(url, "./example.txt");
export const readInput = async (url: string) => read(url, "./input.txt");

export const intersect = <T>(...sets: Set<T>[]): Set<T> => {
  if (sets.length === 0) return new Set();
  if (sets.length === 1) return sets[0];
  return intersect(new Set(Array.from(sets[0]).filter((x) => sets[1].has(x))), ...sets.slice(2));
};

export const union = <T>(...sets: Set<T>[]): Set<T> => {
  return new Set(sets.map((set) => [...set]).flat());
};

export const sum = (numbers: number[]): number => numbers.reduce((total, number) => total + number, 0);
export const product = (numbers: number[]): number => numbers.reduce((total, number) => total * number, 1);

export const chunk = <T>(array: T[], chunkSize: number): T[][] => {
  return array.length <= chunkSize ? [array] : [array.slice(0, chunkSize), ...chunk(array.slice(chunkSize), chunkSize)];
};

export const rotated = <T>(matrix: T[][]) => matrix[0].map((_, i) => matrix.map((row) => row[i]));

//** from and to will be in the range */
export const range = (from: number, to: number) => {
  const start = Math.min(from, to);
  const end = Math.max(from, to);
  return new Array(end + 1 - start).fill(1).map((d, i) => i + start);
};
