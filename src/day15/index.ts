import { range } from "../shared/index.js";

type Position = { x: number; y: number };

type Sensor = Position & { closestBeacon: Position };

const parseSensor = (line: string): Sensor => {
  const regex = /.*x=(-?[0-9]*), y=(-?[0-9]*).*x=(-?[0-9]*), y=(-?[0-9]*)/;
  const result = regex
    .exec(line)
    ?.slice(1, 5)
    .map((nb) => parseInt(nb));
  if (!result) throw new Error();
  return { x: result[0], y: result[1], closestBeacon: { x: result[2], y: result[3] } };
};

const visionOnRow = (sensor: Sensor, rowIndex: number): number[] => {
  const distanceSensorBeacon = Math.abs(sensor.x - sensor.closestBeacon.x) + Math.abs(sensor.y - sensor.closestBeacon.y);
  const distanceSensorRow = Math.abs(sensor.y - rowIndex);
  if (distanceSensorBeacon < distanceSensorRow) return [];
  // {
  //   const r = range(sensor.x - (distanceSensorBeacon - distanceSensorRow), sensor.x + (distanceSensorBeacon - distanceSensorRow));
  //   console.log(sensor, r);
  // }
  return range(sensor.x - (distanceSensorBeacon - distanceSensorRow), sensor.x + (distanceSensorBeacon - distanceSensorRow));
};

export default {
  firstSolve: (input, studiedRowIndex = 2000000) => {
    const lines = input.split("\n");
    const sensors = lines.slice(1).map(parseSensor);
    const ranges = sensors.map((sensor) => visionOnRow(sensor, studiedRowIndex));
    const positions = new Set(ranges.flat());
    const beaconsOnRow = sensors.filter((sensor) => sensor.closestBeacon.y === studiedRowIndex).map((sensor) => sensor.closestBeacon);
    beaconsOnRow.forEach((beacon) => positions.delete(beacon.x));
    return positions.size;
  },

  secondSolve: (input, searchSpaceWidth = 4000000) => {
    const lines = input.split("\n");
    const studiedRowIndex = parseInt(lines[0]);
    const sensors = lines.slice(1).map(parseSensor);
    return 0;
  },
} satisfies Day<number, number>;
