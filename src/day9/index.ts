type Position = { x: number; y: number };
type Direction = "D" | "U" | "L" | "R";

const parseInstruction = (line: string): [Direction, number] => {
  const splitted = line.split(" ");
  return [splitted[0] as Direction, parseInt(splitted[1])];
};

const moveHead = (head: Position, direction: Direction) => {
  if (direction === "D") head.y--;
  else if (direction === "U") head.y++;
  else if (direction === "R") head.x++;
  else if (direction === "L") head.x--;
};

const moveKnot = (knot: Position, ahead: Position) => {
  const xDist = ahead.x - knot.x;
  const yDist = ahead.y - knot.y;
  if (Math.abs(xDist) === 2) {
    knot.x += xDist / 2;
    if (Math.abs(yDist) === 1) knot.y += yDist;
  }
  if (Math.abs(yDist) === 2) {
    knot.y += yDist / 2;
    if (Math.abs(xDist) === 1) knot.x += xDist;
  }
};

class PositionSet extends Set {
  addPosition(position: Position) {
    return this.add(`${position.x},${position.y}`);
  }
}

export default {
  firstSolve: (input) => {
    const lines = input.split("\n");
    const head: Position = { x: 0, y: 0 };
    const tail: Position = { x: 0, y: 0 };
    const visitedByTailPositions: PositionSet = new PositionSet().addPosition(tail);
    lines.forEach((line) => {
      const [direction, distance] = parseInstruction(line);
      for (let _ = 0; _ < distance; _++) {
        moveHead(head, direction);
        moveKnot(tail, head);
        visitedByTailPositions.addPosition(tail);
      }
    });
    return visitedByTailPositions.size;
  },

  secondSolve: (input) => {
    const lines = input.split("\n");
    const rope: Position[] = Array.from({ length: 10 }, (_) => ({ x: 0, y: 0 }));
    const visitedByTailPositions: PositionSet = new PositionSet().addPosition(rope[rope.length - 1]);
    lines.forEach((line) => {
      const [direction, distance] = parseInstruction(line);
      for (let _ = 0; _ < distance; _++) {
        moveHead(rope[0], direction);
        for (let index = 1; index < rope.length; index++) {
          moveKnot(rope[index], rope[index - 1]);
        }
        visitedByTailPositions.addPosition(rope[rope.length - 1]);
      }
    });
    return visitedByTailPositions.size;
  },
} satisfies Day;
