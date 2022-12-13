import { exit } from "process";
import { read } from "./shared/index.js";

const debug = process.argv[2] === "debug";
const dayIndex = parseInt(process.argv[3]);
const puzzleIndex = parseInt(process.argv[4]);

if (isNaN(dayIndex) || (puzzleIndex !== 1 && puzzleIndex !== 2)) {
  console.group("Wrong arguments:");
  console.error("In debug mode call: pnpm debug <d> <p>");
  console.error("In solve mode call: pnpm solve <d> <p>");
  console.error("With d being the day index and p the puzzle index");
  console.groupEnd();
  exit(1);
}

const { firstSolve, secondSolve }: { firstSolve: Solver; secondSolve: Solver } = await import(`./day${dayIndex}/index.ts`);
const input = await read(import.meta.url, `./day${dayIndex}/${debug ? "example" : "input"}.txt`);
console.log(puzzleIndex === 1 ? firstSolve(input) : secondSolve(input));
