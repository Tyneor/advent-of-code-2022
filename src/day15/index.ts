import { Arith, Context, init } from "z3-solver";
import { range } from "../shared/index.js";

type Position = { x: number; y: number };

type Sensor = Position & { range: number };

const manhattanDistance = (pos1: Position, pos2: Position): number => {
  return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
};

const parseSensorAndBeacon = (line: string): [Sensor, Position] => {
  const regex = /.*x=(-?[0-9]*), y=(-?[0-9]*).*x=(-?[0-9]*), y=(-?[0-9]*)/;
  const result = regex
    .exec(line)
    ?.slice(1, 5)
    .map((nb) => parseInt(nb));
  if (!result) throw new Error();
  const sensor = { x: result[0], y: result[1] };
  const beacon = { x: result[2], y: result[3] };
  return [{ ...sensor, range: manhattanDistance(sensor, beacon) }, beacon];
};

const visionOnRow = (sensor: Sensor, rowIndex: number): number[] => {
  const distanceSensorRow = Math.abs(sensor.y - rowIndex);
  if (sensor.range < distanceSensorRow) return [];
  return range(sensor.x - (sensor.range - distanceSensorRow), sensor.x + (sensor.range - distanceSensorRow));
};

function* sensorVisionBorder(sensor: Sensor) {
  let x = sensor.x + 1;
  let y = sensor.y - sensor.range;
  let xIncrement = 1;
  let yIncrement = 1;
  while (true) {
    yield { x, y } as Position;
    if (manhattanDistance(sensor, { x: x + xIncrement, y: y + yIncrement }) >= sensor.range + 2) {
      if (xIncrement === yIncrement) xIncrement = -xIncrement;
      else if (yIncrement === 1) yIncrement = -1;
      else break;
    }
    x += xIncrement;
    y += yIncrement;
  }
}

const hasDistressBeacon = (position: Position, sensors: Sensor[], searchSpaceWidth: number): boolean => {
  if (position.x < 0 || position.y < 0 || position.x > searchSpaceWidth || position.y > searchSpaceWidth) return false;
  for (const sensor of sensors) {
    if (manhattanDistance(sensor, position) <= sensor.range) return false;
  }
  return true;
};

export default {
  firstSolve: (input, studiedRowIndex = 2000000) => {
    const lines = input.split("\n");
    const sensorsAndBeacons = lines.map(parseSensorAndBeacon);
    const ranges = sensorsAndBeacons.map(([sensor, _]) => visionOnRow(sensor, studiedRowIndex));
    const positions = new Set(ranges.flat());
    const beaconsOnRow = sensorsAndBeacons.map(([_, beacon]) => beacon).filter((beacon) => beacon.y === studiedRowIndex);
    beaconsOnRow.forEach((beacon) => positions.delete(beacon.x));
    return positions.size;
  },

  secondSolve: async (input, searchSpaceWidth = 4000000) => {
    const lines = input.split("\n");
    const sensors = lines.map((line) => parseSensorAndBeacon(line)[0]);

    {
      // Running around the borders method
      for (const sensor of sensors) {
        // using a generator is about 30% slower on my machine
        for (const position of sensorVisionBorder(sensor)) {
          if (hasDistressBeacon(position, sensors, searchSpaceWidth)) {
            return position.x * 4000000 + position.y;
          }
        }
      }
      throw new Error("beacon not found");
    }

    {
      // Z3 method
      const { Context } = await init();
      const { Solver, Int, If } = new (Context as any)("main") as Context;
      const Abs = (x: Arith) => If(x.ge(0), x, x.neg());

      const solver = new Solver();
      const x = Int.const("x");
      const y = Int.const("y");
      solver.add(x.ge(0));
      solver.add(x.le(searchSpaceWidth));
      solver.add(y.ge(0));
      solver.add(y.le(searchSpaceWidth));

      for (const sensor of sensors) {
        solver.add(
          Abs(x.sub(sensor.x))
            .add(Abs(y.sub(sensor.y)))
            .gt(sensor.range)
        );
      }

      if ((await solver.check()) !== "sat") throw new Error("beacon not found");
      const res = solver.model();
      const position: Position = { x: parseInt(res.get(x).sexpr()), y: parseInt(res.get(y).sexpr()) };
      return position.x * 4000000 + position.y;
    }
  },
} satisfies Day<number, number>;
