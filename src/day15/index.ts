import { Arith, Context, init } from "z3-solver";
import { range } from "../shared/index.js";

type Position = { x: number; y: number };

type Sensor = Position & { range: number };

const parseSensorAndBeacon = (line: string): [Sensor, Position] => {
  const regex = /.*x=(-?[0-9]*), y=(-?[0-9]*).*x=(-?[0-9]*), y=(-?[0-9]*)/;
  const result = regex
    .exec(line)
    ?.slice(1, 5)
    .map((nb) => parseInt(nb));
  if (!result) throw new Error();
  return [
    { x: result[0], y: result[1], range: Math.abs(result[0] - result[2]) + Math.abs(result[1] - result[3]) },
    { x: result[2], y: result[3] },
  ];
};

const visionOnRow = (sensor: Sensor, rowIndex: number): number[] => {
  const distanceSensorRow = Math.abs(sensor.y - rowIndex);
  if (sensor.range < distanceSensorRow) return [];
  return range(sensor.x - (sensor.range - distanceSensorRow), sensor.x + (sensor.range - distanceSensorRow));
};

const inequation = (sensor: Sensor): void => {
  console.log(sensor);
};

export default {
  firstSolve: (input, studiedRowIndex = 2000000) => {
    const lines = input.split("\n");
    const sensorsAndBeacons = lines.slice(1).map(parseSensorAndBeacon);
    const ranges = sensorsAndBeacons.map(([sensor, _]) => visionOnRow(sensor, studiedRowIndex));
    const positions = new Set(ranges.flat());
    const beaconsOnRow = sensorsAndBeacons.map(([_, beacon]) => beacon).filter((beacon) => beacon.y === studiedRowIndex);
    beaconsOnRow.forEach((beacon) => positions.delete(beacon.x));
    return positions.size;
  },

  secondSolve: async (input, searchSpaceWidth = 4000000) => {
    const lines = input.split("\n");
    const sensors = lines.slice(1).map((line) => parseSensorAndBeacon(line)[0]);
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

    sensors.forEach((sensor) => {
      console.log(sensor);

      solver.add(
        Abs(x.sub(sensor.x))
          .add(Abs(y.sub(sensor.y)))
          .gt(sensor.range)
      );
    });

    console.log(await solver.check());
    const res = solver.model();
    console.log(res.get(x).sexpr());
    console.log(res.get(y).sexpr());

    // const xs = [0, ...sensors.map((s) => s.x).sort((a, b) => a - b), searchSpaceWidth + 1];
    // const ys = [0, ...sensors.map((s) => s.y).sort((a, b) => a - b), searchSpaceWidth + 1];
    // for (let ix = 1; ix < xs.length; ix++) {
    //   for (let iy = 1; iy < ys.length; iy++) {
    //     if (xs[ix - 1] < xs[ix] && ys[iy - 1] < ys[iy]) {
    //       console.log(`${xs[ix - 1]} <= x < ${xs[ix]} and ${ys[iy - 1]} <= y < ${ys[iy]}`);
    //       sensors.forEach(inequation);
    //     }
    //   }
    // }

    return parseInt(res.get(x).sexpr()) * 4000000 + parseInt(res.get(y).sexpr());
  },
} satisfies Day<number, number>;
