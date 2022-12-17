import { chunk, intersect, sum } from "../shared/index.js";

const rucksackIntersection = (rucksackList: Set<string>[]): string => {
  const intersection = intersect(...rucksackList)
    .values()
    .next().value;
  if (typeof intersection !== "string") throw new Error();
  return intersection;
};

const convertToPriority = (char: string): number => {
  const _char = char.charCodeAt(0);
  return _char >= 97 ? _char - 97 + 1 : _char - 65 + 27;
};

export default {
  firstSolve: (input) => {
    const createRucksackList = (line: string) => {
      return [new Set(line.slice(0, line.length / 2)), new Set(line.slice(line.length / 2))];
    };

    const intersections = input.map(createRucksackList).map(rucksackIntersection).map(convertToPriority);
    return sum(intersections);
  },

  secondSolve: (input) => {
    const createRucksackList = (input: string[]) => {
      return chunk(
        input.map((line) => new Set(line)),
        3
      );
    };

    const intersections = createRucksackList(input).map(rucksackIntersection).map(convertToPriority);
    return sum(intersections);
  },
} satisfies Day;
