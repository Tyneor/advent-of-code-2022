mkdir ./src/day$1
folder=./src/day$1

touch $folder/input.txt
touch $folder/example.txt

echo 'export default {
  firstSolve: (input) => {
    return 0;
  },

  secondSolve: (input) => {
    return 0;
  },
} satisfies Day;
' > $folder/index.ts

echo 'import { expect, test } from "vitest";
import { readExample } from "../shared/index.js";
import day from "./index.js";

test("first part", async () => {
  const result = day.firstSolve(await readExample(import.meta.url));
  expect(result).toBe(0);
});

test("second part", async () => {
  const result = day.secondSolve(await readExample(import.meta.url));
  expect(result).toBe(0);
});
' > $folder/index.test.ts