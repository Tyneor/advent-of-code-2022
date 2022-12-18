import { rotated, sum } from "../shared/index.js";

const findVisibleTreesInLine = (trees: number[]): number[] => {
  const reducer = (res: number[], tree: number, index: number) => (tree <= trees[res[0]] ? res : [index, ...res]);
  const [left, right] = [trees.reduce(reducer, []), trees.reduceRight(reducer, [])];
  return [...left.slice(left[0] === right[0] ? 1 : 0).reverse(), ...right];
};

const calculateSightLength = (tree: number, facedTrees: number[]): number => {
  let sight = 0;
  while (facedTrees[sight] < tree) sight++;
  return Math.min(sight + 1, facedTrees.length);
};

const calculateScenicScore = (tree: number, row: number[], col: number[], rowIndex: number, columnIndex: number) => {
  const rightSight = calculateSightLength(tree, row.slice(columnIndex + 1));
  const leftSight = calculateSightLength(tree, row.slice(0, columnIndex).reverse());
  const downSight = calculateSightLength(tree, col.slice(rowIndex + 1));
  const topSight = calculateSightLength(tree, col.slice(0, rowIndex).reverse());
  return rightSight * leftSight * downSight * topSight;
};

export default {
  firstSolve: (input) => {
    const lines = input.split("\n");
    const forest = lines.map((line) => line.split("").map((el) => parseInt(el)));
    const rotatedForest = rotated(forest);
    const rowsVisibleTrees = forest.map(findVisibleTreesInLine);
    const columnsVisibleTrees = rotatedForest.map(findVisibleTreesInLine);
    const filteredRowsVisibleTrees = rowsVisibleTrees.map((row, rowIndex) => row.filter((columnIndex) => !columnsVisibleTrees[columnIndex].includes(rowIndex)));
    return sum(filteredRowsVisibleTrees.map((rows) => rows.length)) + sum(columnsVisibleTrees.map((rows) => rows.length));
  },

  secondSolve: (input) => {
    const lines = input.split("\n");
    const forest = lines.map((line) => line.split("").map((el) => parseInt(el)));
    const res: typeof forest = JSON.parse(JSON.stringify(forest));
    for (let rowIndex = 0; rowIndex < forest.length; rowIndex++) {
      const row = forest[rowIndex];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const col = forest.map((row) => row[columnIndex]);
        res[rowIndex][columnIndex] = calculateScenicScore(row[columnIndex], row, col, rowIndex, columnIndex);
      }
    }
    return Math.max(...res.map((row) => Math.max(...row)));
  },
} satisfies NumberDay;
