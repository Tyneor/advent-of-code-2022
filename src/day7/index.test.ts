import { expect, test } from "vitest";
import { readExample } from "../shared/index.js";
import day from "./index.js";

test("first part", async () => {
  const result = day.firstSolve(await readExample(import.meta.url));
  expect(result).toBe(95437);
});

test("second part", async () => {
  const result = day.secondSolve(await readExample(import.meta.url));
  expect(result).toBe(24933642);
});
