import { expect, test } from "vitest";
import { readExample } from "../shared/index.js";
import { firstSolve, secondSolve } from "./index.js";

test("first part", async () => {
  const result = firstSolve(await readExample(import.meta.url));
  expect(result).toBe(24000);
});

test("second part", async () => {
  const result = secondSolve(await readExample(import.meta.url));
  expect(result).toBe(45000);
});
