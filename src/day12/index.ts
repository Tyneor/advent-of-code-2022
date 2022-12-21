type Position = { colIndex: number; rowIndex: number };
// top left is at x: 0, y: 0

class Map {
  grid: number[][];
  distances: number[][];
  start!: Position;
  end!: Position;

  constructor(input: string) {
    this.grid = input.split("\n").map((row, rowIndex) =>
      row.split("").map((char, colIndex) => {
        const code = char.charCodeAt(0);
        if (code === 83) {
          this.start = { rowIndex, colIndex };
          return 0;
        } else if (code === 69) {
          this.end = { rowIndex, colIndex };
          return 25;
        }
        return char.charCodeAt(0) - 97;
      })
    );
    this.distances = this.grid.map((row) => row.map((_) => +Infinity));
    this.distances[this.start.rowIndex][this.start.colIndex] = 0;
  }
}

export default {
  firstSolve: (input) => {
    const map = new Map(input);
    console.log(map);

    return 0;
  },

  secondSolve: (input) => {
    return 0;
  },
} satisfies Day<number, number>;
