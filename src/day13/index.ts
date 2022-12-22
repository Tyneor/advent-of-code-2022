import { chunk, sum } from "../shared/index.js";

type Packet = number | Packet[];

const parsePairs = (input: string): [Packet, Packet][] => {
  return chunk(
    input.split("\n").map((line) => (line ? JSON.parse(line) : line)),
    3
  ).map((pair) => pair.slice(0, 2) as [Packet, Packet]);
};

const parsePackets = (input: string): Packet[] => {
  const lines = input.split("\n").filter((line) => line !== "");
  return lines.map((line) => JSON.parse(line));
};

const isPairRightlyOrdered = (left: Packet, right: Packet): boolean | undefined => {
  if (typeof left === "number" && typeof right === "number") {
    if (left < right) return true;
    if (left > right) return false;
  } else if (Array.isArray(left) && Array.isArray(right)) {
    for (let index = 0; index < left.length; index++) {
      if (right[index] === undefined) return false;
      const ordered = isPairRightlyOrdered(left[index], right[index]);
      if (ordered !== undefined) return ordered;
    }
    if (right.length > left.length) return true;
  } else if (Array.isArray(left) && typeof right === "number") {
    const ordered = isPairRightlyOrdered(left, [right]);
    if (ordered !== undefined) return ordered;
  } else if (typeof left === "number" && Array.isArray(right)) {
    const ordered = isPairRightlyOrdered([left], right);
    if (ordered !== undefined) return ordered;
  }
  return undefined;
};

export default {
  firstSolve: (input) => {
    const pairs = parsePairs(input);
    const pairsOrders = pairs.map((pair) => isPairRightlyOrdered(pair[0], pair[1]));
    return sum(pairsOrders.map((rightOrder, pairIndex) => (rightOrder ? pairIndex + 1 : 0)));
  },

  secondSolve: (input) => {
    const packets = parsePackets(input);
    const dividers = [[[2]], [[6]]];
    packets.push(...dividers);
    packets.sort((p1, p2) => (isPairRightlyOrdered(p1, p2) ? -1 : 1));
    return (packets.indexOf(dividers[0]) + 1) * (packets.indexOf(dividers[1]) + 1);
  },
} satisfies Day<number, number>;
