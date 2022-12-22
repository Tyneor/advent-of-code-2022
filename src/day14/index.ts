import { range } from "../shared/index.js";

const parseObstacleGrid = (input: string): boolean[][] => {
  const getObstaclesBetween = (start: [number, number], end: [number, number]): [number, number][] => {
    if (start[0] === end[0]) return range(start[1], end[1]).map((y) => [start[0], y] as [number, number]);
    if (start[1] === end[1]) return range(start[0], end[0]).map((x) => [x, start[1]] as [number, number]);
    return [];
  };

  const obstacles: [number, number][] = [];
  input.split("\n").forEach((line) => {
    const points = line.split("->").map((point) => point.split(",").map((nb) => parseInt(nb)) as [number, number]);
    for (let index = 1; index < points.length; index++) {
      obstacles.push(...getObstaclesBetween(points[index - 1], points[index]));
    }
  });

  const topLeft = [Math.min(...obstacles.map((obstacle) => obstacle[0])), 0] as const;
  const bottomRight = [Math.max(...obstacles.map((obstacle) => obstacle[0])), Math.max(...obstacles.map((obstacle) => obstacle[1]))] as const;

  const grid = Array.from({ length: bottomRight[1] + 1 - topLeft[1] }).map((_) => [] as boolean[]);
  obstacles.forEach(([x, y]) => (grid[y][x] = true));
  return grid;
};

const pourOneGrain = (obstacleGrid: boolean[][]): "source blocked" | void => {
  let position: [number, number] = [500, 0];
  while (true) {
    if (!obstacleGrid[position[1] + 1][position[0]]) {
      position[1]++;
    } else if (!obstacleGrid[position[1] + 1][position[0] - 1]) {
      position[1]++;
      position[0]--;
    } else if (!obstacleGrid[position[1] + 1][position[0] + 1]) {
      position[1]++;
      position[0]++;
    } else if (obstacleGrid[position[1]][position[0]]) {
      return "source blocked";
    } else {
      obstacleGrid[position[1]][position[0]] = true;
      break;
    }
  }
};

export default {
  firstSolve: (input) => {
    const obstacleGrid = parseObstacleGrid(input);

    let nbSandGrains = 0;
    try {
      while (true) {
        pourOneGrain(obstacleGrid);
        nbSandGrains++;
      }
    } catch {}
    return nbSandGrains;
  },

  secondSolve: (input) => {
    const obstacleGrid = parseObstacleGrid(input);

    obstacleGrid.push(...[[], []]);
    range(500 - obstacleGrid.length, 500 + obstacleGrid.length).forEach((colIndex) => {
      obstacleGrid[obstacleGrid.length - 1][colIndex] = true;
    });

    let nbSandGrains = 0;
    try {
      while (true) {
        if (pourOneGrain(obstacleGrid) === "source blocked") break;
        nbSandGrains++;
      }
    } catch {}
    return nbSandGrains;
  },
} satisfies Day<number, number>;
