import { sum } from "../shared/index.js";

type Dir = { children: Dir[]; files: number; current: boolean };
// current is used for debugging

function* buffer<T>(array: T[]) {
  for (const item of array) yield item;
}

const fillDir = (lines: Generator<string>, dir: Dir) => {
  dir.current = true;
  let childIndex = 0;
  while (true) {
    const { done, value: line } = lines.next();
    if (done) return dir.files;

    const words = line.split(" ");

    if (words[0] === "$") {
      if (words[2] === "..") {
        dir.current = false;
        return dir.files;
      }
      if (words[1] === "cd") {
        dir.current = false;
        dir.files += fillDir(lines, dir.children[childIndex++]);
      }
    } else if (words[0] === "dir") {
      dir.children.push({ children: [], files: 0, current: false });
    } else if (!isNaN(parseInt(words[0]))) {
      dir.files += parseInt(words[0]);
    }
  }
};

const findSmallDirs = (dir: Dir, threshold: number) => {
  const smallDirs: number[] = [];
  if (dir.files <= threshold) smallDirs.push(dir.files);
  dir.children.forEach((child) => smallDirs.push(...findSmallDirs(child, threshold)));
  return smallDirs;
};

const findSmallestDirAboveThreshold = (dir: Dir, threshold: number) => {
  let smallestDir = +Infinity;
  if (dir.files >= threshold) smallestDir = Math.min(dir.files, smallestDir);
  dir.children.forEach((child) => {
    smallestDir = Math.min(findSmallestDirAboveThreshold(child, threshold), smallestDir);
  });
  return smallestDir;
};

export default {
  firstSolve: (input) => {
    const lines = buffer(input.split("\n").slice(2));
    const root: Dir = { children: [], files: 0, current: false };
    fillDir(lines, root);
    // console.dir(root, { depth: 10 });
    const smallDirs = findSmallDirs(root, 100000);
    // console.log(smallDirs);
    return sum(smallDirs);
  },

  secondSolve: (input) => {
    const DISK_SPACE = 70_000_000;
    const REQUIRED_SPACE = 30_000_000;
    const lines = buffer(input.split("\n").slice(2));
    const root: Dir = { children: [], files: 0, current: false };
    const totalSpaceUsed = fillDir(lines, root);
    const remainingRequiredSpace = REQUIRED_SPACE + totalSpaceUsed - DISK_SPACE;
    return findSmallestDirAboveThreshold(root, remainingRequiredSpace);
  },
} satisfies Day<number, number>;
