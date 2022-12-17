import { expect, test } from "vitest";
import { readExample } from "../shared/index.js";
import day1 from "./index.js";

test("first part", async () => {
  const result = day1.firstSolve(await readExample(import.meta.url));
  expect(result).toBe(24000);
});

test("second part", async () => {
  const result = day1.secondSolve(await readExample(import.meta.url));
  expect(result).toBe(45000);
});
