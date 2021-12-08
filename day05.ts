import * as aoc from './utils/aoc';
import { input05 } from './inputs';

interface Vector2 {
  x, y: number;
}

interface Vent {
  start: Vector2;
  end: Vector2;
}

const data = aoc.lines(input05);
const vents: Vent[] = data.map(line => {
  const [startData, endData] = line.split(' -> ');
  const [startX, startY] = startData.split(',');
  const [endX, endY] = endData.split(',');

  return {
    start: { x: parseInt(startX), y: parseInt(startY) },
    end: { x: parseInt(endX), y: parseInt(endY) },
  }
});

const lineVents: Vent[] = [];
const diagonalVents: Vent[] = [];

vents.forEach(vent => {
  if (vent.start.x === vent.end.x || vent.start.y === vent.end.y) {
    lineVents.push(vent);
  } else {
    diagonalVents.push(vent);
  }
});

const intersec = new Map<string, number>();
const countIntersec = (point: string) => intersec.set(point, intersec.has(point) ? intersec.get(point) + 1 : 1);

// STAR 01
lineVents.forEach(vent => {
  if (vent.start.x === vent.end.x) {
    const increment = vent.start.y < vent.end.y ? +1 : -1;

    for (let y = vent.start.y; y !== vent.end.y + increment; y += increment) {
      const point = `${vent.start.x},${y}`;
      countIntersec(point);
    }
  } else { // start.y === end.y
    const increment = vent.start.x < vent.end.x ? +1 : -1;

    for (let x = vent.start.x; x !== vent.end.x + increment; x += increment) {
      const point = `${x},${vent.start.y}`;
      countIntersec(point);
    }
  }
});

const lineIntersec = Array.from(intersec.values()).filter(value => value >= 2).length;
aoc.answer(1, lineIntersec);

// STAR 02
diagonalVents.forEach(vent => {
  const directionX = vent.start.x < vent.end.x ? +1 : -1;
  const directionY = vent.start.y < vent.end.y ? +1 : -1;
  const maxIncrement = Math.abs(vent.start.x - vent.end.x);

  for (let inc = 0; inc <= maxIncrement; inc++) {
    const point = `${vent.start.x + (inc * directionX)},${vent.start.y + (inc * directionY)}`;
    countIntersec(point);
  }
});

const fullIntersec = Array.from(intersec.values()).filter(value => value >= 2).length;
aoc.answer(2, fullIntersec);