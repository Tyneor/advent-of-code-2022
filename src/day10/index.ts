import { sum } from "../shared/index.js";

const fillSignalStrengths = (strengths: number[], cycle: number, registerX: number) => {
  const interestingCycles = Array.from({ length: 6 }, (_, i) => i * 40 + 20);
  for (let index = 0; index < interestingCycles.length; index++) {
    if (strengths.length === index && cycle >= interestingCycles[index]) strengths.push(interestingCycles[index] * registerX);
  }
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
    return "0";
  },
} satisfies Day<number, string>;
