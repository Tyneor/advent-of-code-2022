const buildElves = (lines: string[]) => {
  return lines.reduce((elves, line) => (line === "" ? [0, ...elves] : [elves[0] + parseInt(line), ...elves.slice(1)]), [0]);
};

export default {
  firstSolve: (input) => {
    const elves = buildElves(input.split("\n"));
    return Math.max(...elves);
  },

  secondSolve: (input) => {
    const elves = buildElves(input.split("\n"));
    const sortedElves = elves.sort((caloriesA, caloriesB) => caloriesB - caloriesA);
    return sortedElves[0] + sortedElves[1] + sortedElves[2];
  },
} satisfies Day<number, number>;
