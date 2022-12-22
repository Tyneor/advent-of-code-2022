type Node = {
  height: number;
  neighbours: Node[];
  distanceToEnd: number;
  visited: boolean;
  isStart: boolean;
  debugPosition?: [number, number];
};

const parseInput = (input: string): [Node[], Node[][]] => {
  const grid: Node[][] = input.split("\n").map((row) =>
    row.split("").map((char): Node => {
      const code = char.charCodeAt(0);
      return {
        height: code === 83 ? 0 : code === 69 ? 25 : char.charCodeAt(0) - 97,
        neighbours: [],
        distanceToEnd: code === 69 ? 0 : +Infinity,
        visited: false,
        isStart: code === 83,
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
      node.neighbours = potentialNeighbourPositions
        .map((position) => grid[rowIndex + position[0]]?.[colIndex + position[1]])
        .filter((potentialNeighbour) => potentialNeighbour && potentialNeighbour.height + 1 >= node.height);
    });
  });
  return [grid.flat(), grid];
};

const findIndexClosestToEnd = (nodes: Node[]): number => {
  let closestNodeIndex = 0;
  let smallestDistance = nodes[closestNodeIndex].distanceToEnd;
  for (let index = 1; index < nodes.length; index++) {
    if (nodes[index].distanceToEnd < smallestDistance) {
      smallestDistance = nodes[index].distanceToEnd;
      closestNodeIndex = index;
    }
  }
  return closestNodeIndex;
};

const visitNode = (node: Node) => {
  node.visited = true;
  node.neighbours.forEach((neighbour) => {
    if (!neighbour.visited) {
      neighbour.distanceToEnd = Math.min(neighbour.distanceToEnd, node.distanceToEnd + 1);
    }
  });
};

function runDijkstra<T extends boolean>(nodes: Node[], forAllNode: T, debugCallback?: () => void): T extends true ? Node[] : number;
function runDijkstra(nodes: Node[], forAllNodes = false, debugCallback?: () => void): Node[] | number {
  const visitedNodes: Node[] = [];
  while (nodes.length > 0) {
    const closestNodeIndex = findIndexClosestToEnd(nodes);
    const node = nodes[closestNodeIndex];
    if (forAllNodes) visitedNodes.push(node);
    else if (node.isStart) return node.distanceToEnd;
    nodes.splice(closestNodeIndex, 1);
    visitNode(node);
    if (debugCallback) debugCallback();
  }
  if (forAllNodes) return visitedNodes;
  throw new Error("Distance to end not found");
}

export default {
  firstSolve: (input) => {
    const [nodes, debugGrid] = parseInput(input);
    const distanceStartToEnd = runDijkstra(nodes, false);
    // const distanceStartToEnd = runDijkstra(nodes, false, () => console.table(debugGrid?.map((row) => row.map((node) => node.distanceToEnd))));
    return distanceStartToEnd;
  },

  secondSolve: (input) => {
    const [nodes, _] = parseInput(input);
    const visitedNodes = runDijkstra(nodes, true);
    return Math.min(...visitedNodes.filter((node) => node.height === 0).map((node) => node.distanceToEnd));
  },
} satisfies Day<number, number>;
