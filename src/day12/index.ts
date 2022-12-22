type Node = {
  height: number;
  neighbours: Node[];
  distanceFromStart: number;
  visited: boolean;
  isEnd: boolean;
  debugPosition?: [number, number];
  // previousNode: Node
};

const parseInput = (input: string, multipleStarts = false): [Node[], Node[][]] => {
  const grid: Node[][] = input.split("\n").map((row) =>
    row.split("").map((char): Node => {
      const code = char.charCodeAt(0);
      const distanceFromStart = code === 83 || (multipleStarts && code == 97) ? 0 : +Infinity;
      return {
        height: code === 83 ? 0 : code === 69 ? 25 : char.charCodeAt(0) - 97,
        neighbours: [],
        distanceFromStart,
        visited: false,
        isEnd: code === 69,
      };
    })
  );

  grid.forEach((row, rowIndex) => {
    row.forEach((node, colIndex) => {
      node.debugPosition = [rowIndex, colIndex];
      const potentialNeighbourPositions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      potentialNeighbourPositions.forEach((position) => {
        const potentialNeighbour = grid[rowIndex + position[0]]?.[colIndex + position[1]];
        if (potentialNeighbour && potentialNeighbour.height - 1 <= node.height) {
          node.neighbours.push(potentialNeighbour);
        }
      });
    });
  });
  return [grid.flat(), grid];
};

const findIndexClosestToStart = (nodes: Node[]): number => {
  let closestNodeIndex = 0;
  let smallestDistance = nodes[closestNodeIndex].distanceFromStart;
  for (let index = 1; index < nodes.length; index++) {
    if (nodes[index].distanceFromStart < smallestDistance) {
      smallestDistance = nodes[index].distanceFromStart;
      closestNodeIndex = index;
    }
  }
  return closestNodeIndex;
};

const visitNode = (node: Node) => {
  node.visited = true;
  node.neighbours.forEach((neighbour) => {
    if (!neighbour.visited) {
      neighbour.distanceFromStart = Math.min(neighbour.distanceFromStart, node.distanceFromStart + 1);
    }
  });
};

const runDijkstra = (nodes: Node[], debugGrid?: Node[][]): number => {
  while (nodes.length > 0) {
    const closestNodeIndex = findIndexClosestToStart(nodes);
    const node = nodes[closestNodeIndex];
    if (node.isEnd) return node.distanceFromStart;
    nodes.splice(closestNodeIndex, 1);
    visitNode(node);
    // console.log(node.debugPosition);
    // console.table(debugGrid.map((row) => row.map((node) => node.distanceFromStart)));
  }
  throw new Error("Distance to end not found");
};

const duplicateNodes = (nodes: Node[]): Node[] => {
  const neighboursIndex = nodes.map((node) => node.neighbours.map((neighbour) => nodes.indexOf(neighbour)));
  const copiedNodes = nodes.map(
    (node): Node => ({
      height: node.height,
      distanceFromStart: node.distanceFromStart,
      visited: node.visited,
      isEnd: node.isEnd,
      debugPosition: node.debugPosition,
      neighbours: [],
    })
  );
  copiedNodes.forEach((node, nodeIndex) => {
    node.neighbours = neighboursIndex[nodeIndex].map((neighbourIndex) => copiedNodes[neighbourIndex]);
  });
  return copiedNodes;
};

export default {
  firstSolve: (input) => {
    const [nodes, debugGrid] = parseInput(input);
    const distanceStartToEnd = runDijkstra(nodes, debugGrid);
    return distanceStartToEnd;
  },

  secondSolve: (input) => {
    const [nodes, _] = parseInput(input, true);
    const potentialStarts = nodes.filter((node) => node.distanceFromStart === 0);
    nodes.forEach((node) => (node.distanceFromStart = +Infinity));
    const distances = potentialStarts.map((potentialStart, i) => {
      // console.log(i + "/" + potentialStarts.length);
      potentialStart.distanceFromStart = 0;
      return runDijkstra(duplicateNodes(nodes));
    });
    return Math.min(...distances);
  },
} satisfies Day<number, number>;
