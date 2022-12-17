type Elf = [number, number];

const parseTwoElves = (line: string): [Elf, Elf] => {
  const parseElf = (str: string): Elf => str.split("-").map((id) => parseInt(id)) as Elf;
  return line.split(",").map(parseElf) as [Elf, Elf];
};

const areElvesNesting = (outer: Elf, inner: Elf) => {
  return outer[0] <= inner[0] && inner[0] <= outer[1] && outer[0] <= inner[1] && inner[1] <= outer[1];
};

const areElvesOverlapping = (outer: Elf, inner: Elf) => {
  return (outer[0] <= inner[0] && inner[0] <= outer[1]) || (outer[0] <= inner[1] && inner[1] <= outer[1]);
};

export default {
  firstSolve: (input) => {
    const nestedPairs = input.map(parseTwoElves).filter(([elf1, elf2]) => areElvesNesting(elf1, elf2) || areElvesNesting(elf2, elf1));
    return nestedPairs.length;
  },

  secondSolve: (input) => {
    const overlappingPairs = input.map(parseTwoElves).filter(([elf1, elf2]) => areElvesOverlapping(elf1, elf2) || areElvesOverlapping(elf2, elf1));
    return overlappingPairs.length;
  },
} satisfies Day;
