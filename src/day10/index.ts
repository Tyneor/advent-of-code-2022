import { chunk, sum } from "../shared/index.js";

const fillSignalStrengths = (strengths: number[], cycle: number, registerX: number) => {
  const interestingCycles = Array.from({ length: 6 }, (_, i) => i * 40 + 20);
  for (let index = 0; index < interestingCycles.length; index++) {
    if (strengths.length === index && cycle >= interestingCycles[index]) strengths.push(interestingCycles[index] * registerX);
  }
};

const constructScreen = (oneDimScreen: boolean[]) => {
  return chunk(
    oneDimScreen.map((bool) => (bool ? "#" : ".")),
    40
  ).map((line) => line.join(""));
};

export default {
  firstSolve: (input) => {
    const lines = input.split("\n");
    let cycle = 0;
    let registerX = 1;
    const strengths: number[] = [];
    lines.forEach((line) => {
      const [operation, value] = line.split(" ");
      cycle += operation === "noop" ? 1 : 2;
      fillSignalStrengths(strengths, cycle, registerX);
      if (operation === "addx") registerX += parseInt(value);
    });

    return sum(strengths);
  },

  secondSolve: (input) => {
    const lines = input.split("\n");
    let cycle = 0;
    let registerX = 1;
    const oneDimScreen: boolean[] = [];

    const runOneCycle = () => {
      oneDimScreen.push(Math.abs(cycle - registerX) <= 1);
      cycle = (cycle + 1) % 40;
    };

    lines.forEach((line) => {
      const [operation, value] = line.split(" ");
      if (operation === "noop") {
        runOneCycle();
      } else if (operation === "addx") {
        runOneCycle();
        runOneCycle();
        registerX += parseInt(value);
      }
    });

    return constructScreen(oneDimScreen);
  },
} satisfies Day<number, string[]>;
