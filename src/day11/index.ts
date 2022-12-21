import { chunk, product } from "../shared/index.js";

type Operation = (old: number) => number;
type Test = (worryLevel: number) => Monkey;

type Monkey = {
  items: number[];
  operation: Operation;
  nextMonkey: Test;
  nbInspections: 0;
};

type UnlinkedMonkey = Omit<Monkey, "nextMonkey"> & { test: { quotient: number; onTrue: number; onFalse: number } };

const parseMonkey = (lines: string[]): UnlinkedMonkey => {
  const items = lines[0]
    .split(" ")
    .slice(4)
    .map((item) => parseInt(item));
  const [operator, operand] = lines[1].split(" ").slice(-2);
  const operation: Operation = operand === "old" ? (old) => old * old : operator === "+" ? (old) => old + parseInt(operand) : (old) => old * parseInt(operand);
  const test = {
    quotient: parseInt(lines[2].split(" ").slice(-1)[0]),
    onTrue: parseInt(lines[3].split(" ").slice(-1)[0]),
    onFalse: parseInt(lines[4].split(" ").slice(-1)[0]),
  };
  return { items, operation, test, nbInspections: 0 };
};

const linkMonkeys = (unlinkedMonkeys: UnlinkedMonkey[]): Monkey[] => {
  const monkeys: Monkey[] = unlinkedMonkeys.map((unlinkedMonkey) => {
    return { items: unlinkedMonkey.items, operation: unlinkedMonkey.operation, nbInspections: unlinkedMonkey.nbInspections, nextMonkey: () => ({} as Monkey) };
  });
  monkeys.map((monkey, i) => {
    const monkeyOnTrue = monkeys[unlinkedMonkeys[i].test.onTrue];
    const monkeyOnFalse = monkeys[unlinkedMonkeys[i].test.onFalse];
    const quotient = unlinkedMonkeys[i].test.quotient;
    monkey.nextMonkey = (worryLevel: number) => (worryLevel % quotient === 0 ? monkeyOnTrue : monkeyOnFalse);
  });
  return monkeys;
};

const playMonkeyTurn = (monkey: Monkey, relieved: boolean, reliefFactor: number): void => {
  monkey.items.forEach((item) => {
    monkey.nbInspections++;
    const newWorryLevel = Math.floor(monkey.operation(item) / (relieved ? 3 : 1)) % reliefFactor;
    const nextOwner = monkey.nextMonkey(newWorryLevel);
    nextOwner.items.push(newWorryLevel);
  });
  monkey.items = [];
};

const computeMonkeyBusiness = (nbRounds: number, input: string, relieved: boolean): number => {
  const monkeysInput = chunk(input.split("\n"), 7);
  const unlinkedMonkeys = monkeysInput.map((monkeyInput) => parseMonkey(monkeyInput.slice(1, 6)));
  const reliefFactor = product(unlinkedMonkeys.map((unlinkedMonkey) => unlinkedMonkey.test.quotient));
  const monkeys = linkMonkeys(unlinkedMonkeys);
  for (let index = 0; index < nbRounds; index++) {
    monkeys.forEach((monkey) => playMonkeyTurn(monkey, relieved, reliefFactor));
  }
  const nbInspections = monkeys.map((monkey) => monkey.nbInspections).sort((a, b) => b - a);
  return nbInspections[0] * nbInspections[1];
};

export default {
  firstSolve: (input) => computeMonkeyBusiness(20, input, true),
  secondSolve: (input) => computeMonkeyBusiness(10_000, input, false),
} satisfies Day<number, number>;
