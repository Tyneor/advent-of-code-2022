import { describe, expect, test } from "vitest";
import day from "./index.js";

describe("first part", () => {
  test("mjqjpqmgbljsphdztnvjfqwrcgsmlb", () => {
    expect(day.firstSolve("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).toBe(7);
  });
  test("bvwbjplbgvbhsrlpgdmjqwftvncz", () => {
    expect(day.firstSolve("bvwbjplbgvbhsrlpgdmjqwftvncz")).toBe(5);
  });
  test("nppdvjthqldpwncqszvftbrmjlhg", () => {
    expect(day.firstSolve("nppdvjthqldpwncqszvftbrmjlhg")).toBe(6);
  });
  test("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", () => {
    expect(day.firstSolve("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toBe(10);
  });
  test("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", () => {
    expect(day.firstSolve("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toBe(11);
  });
});

describe("first part", () => {
  test("mjqjpqmgbljsphdztnvjfqwrcgsmlb", () => {
    expect(day.secondSolve("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).toBe(0);
  });
});
