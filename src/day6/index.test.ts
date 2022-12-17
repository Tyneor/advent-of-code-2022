import { describe, expect, test } from "vitest";
import day from "./index.js";

describe("first part", () => {
  const map = {
    mjqjpqmgbljsphdztnvjfqwrcgsmlb: 7,
    bvwbjplbgvbhsrlpgdmjqwftvncz: 5,
    nppdvjthqldpwncqszvftbrmjlhg: 6,
    nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: 10,
    zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: 11,
  };
  Object.entries(map).forEach(([message, marker]) =>
    test(message, () => {
      expect(day.firstSolve(message)).toBe(marker);
    })
  );
});

describe("first part", () => {
  const map = {
    mjqjpqmgbljsphdztnvjfqwrcgsmlb: 19,
    bvwbjplbgvbhsrlpgdmjqwftvncz: 23,
    nppdvjthqldpwncqszvftbrmjlhg: 23,
    nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: 29,
    zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: 26,
  };
  Object.entries(map).forEach(([message, marker]) =>
    test(message, () => {
      expect(day.secondSolve(message)).toBe(marker);
    })
  );
});
