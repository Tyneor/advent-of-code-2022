export const buildElves = (lines: string[]) => {
  return lines.reduce((elves, line) => (line === "" ? [0, ...elves] : [elves[0] + parseInt(line), ...elves.slice(1)]), [0]);
};

export const firstSolve: Solver = (input) => {
  const elves = buildElves(input);
  return Math.max(...elves);
};

export const secondSolve: Solver = (input) => {
  const elves = buildElves(input);
  const sortedElves = elves.sort((caloriesA, caloriesB) => caloriesB - caloriesA);
  return sortedElves[0] + sortedElves[1] + sortedElves[2];
};
