const solve = (input: string, startOfPacketLength = 4 | 14): number => {
  for (let marker = startOfPacketLength; marker < input.length; marker++) {
    const window = input.slice(marker - startOfPacketLength, marker);
    if (new Set(window).size === startOfPacketLength) return marker;
  }
  return input.length;
};

export default {
  firstSolve: (input) => solve(input, 4),
  secondSolve: (input) => solve(input, 14),
} satisfies Day<number, number>;
