type Stack = String[];
type Ship = Stack[];
type Instruction = [number, number, number];

const parseShip = (lines: string[]): Ship => {
  const nbStacks = Math.floor(lines[0].length / 3);
  const stacks: Ship = Array.from({ length: nbStacks }).map((_) => []);
  for (const line of lines) {
    for (let index = 0; index < nbStacks; index++) {
      const crate = line[1 + index * 4];
      if (crate !== " ") stacks[index].push(crate);
    }
  }
  return stacks;
};

const parseInstructions = (lines: string[]): Instruction[] => {
  const parseInstruction = (line: string): Instruction => {
    return line
      .split(/move|from|to/)
      .slice(1)
      .map((nb) => parseInt(nb)) as Instruction;
  };
  return lines.map(parseInstruction);
};

const executeInstructions = (ship: Ship, instructions: Instruction[], useCrateMover9001 = false): void => {
  for (const instruction of instructions) {
    const from = ship[instruction[1] - 1];
    const to = ship[instruction[2] - 1];
    const crates = from.splice(0, instruction[0]);
    to.unshift(...(useCrateMover9001 ? crates : crates.reverse()));
  }
};

const solve = (input: string[], useCrateMover9001 = false) => {
  const emptyIndex = input.findIndex((line) => line === "");
  const ship = parseShip(input.slice(0, emptyIndex - 1));
  const instructions = parseInstructions(input.slice(emptyIndex + 1));
  executeInstructions(ship, instructions, useCrateMover9001);
  return ship.map((stack) => stack[0]).join("");
};

export default {
  firstSolve: (input) => solve(input),
  secondSolve: (input) => solve(input, true),
} satisfies StringDay;
