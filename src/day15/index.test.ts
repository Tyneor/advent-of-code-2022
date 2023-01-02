import { expect, test } from "vitest";
import { readExample } from "../shared/index.js";
import day from "./index.js";

test("first part", async () => {
  const result = day.firstSolve(await readExample(import.meta.url), 10);
  expect(result).toBe(26);
});

test("second part", async () => {
  const result = day.secondSolve(await readExample(import.meta.url), 20);
  expect(await result).toBe(14 * 4000000 + 11);
});
