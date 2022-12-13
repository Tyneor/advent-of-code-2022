import { readFile } from "fs/promises";

export const read = async (url: string, filename: string) => {
  const file = await readFile(new URL(filename, url), `utf-8`);
  return file.split(`\n`);
};

export const readExample = async (url: string) => read(url, "./example.txt");
