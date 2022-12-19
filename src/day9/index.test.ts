import { expect, test } from "vitest";
import { read, readExample } from "../shared/index.js";
import day from "./index.js";

test("first part", async () => {
  const result = day.firstSolve(await readExample(import.meta.url));
  expect(result).toBe(13);
});

test("second part", async () => {
  const result = day.secondSolve(await readExample(import.meta.url));
  expect(result).toBe(1);

  const readExample2 = async (url: string) => read(url, "./example2.txt");
  const result2 = day.secondSolve(await readExample2(import.meta.url));
  expect(result2).toBe(36);
});
