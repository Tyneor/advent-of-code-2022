import { expect, test } from "vitest";
import { readExample } from "../shared/index.js";
import { firstSolve } from "./index.js";

test("example", async () => {
  const result = firstSolve(await readExample(import.meta.url));
  expect(result).toBe(24000);
});
