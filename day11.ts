import * as aoc from './utils/aoc';
import { input11 } from './inputs';

const matrixSize = 10;
const isPosValid = (row: number, col: number) => (aoc.isMatrixPositionValid(row, col, matrixSize, matrixSize));

const maxEnergy = 9;
const octopusAmount = matrixSize * matrixSize;

const posToStr = (row: number, col: number) => (`${row},${col}`);
const strToPos = (str: string) => (str.split(',').map(strNum => parseInt(strNum)));

function octopusStep(octopus: number[][]): number {
  const toFlash: Array<string> = [];
  const flashed: Array<string> = [];

  for (let row = 0; row < matrixSize; row++) {
    for (let col = 0; col < matrixSize; col++) {
      // phase 01: increase all energy levels by 1
      octopus[row][col]++;

      // phase 02-a: energy levels beyond maximum will flash
      if (octopus[row][col] > maxEnergy) {
        toFlash.push(posToStr(row, col));
      }
    }
  }

  while (toFlash.length > 0) {
    const flashing = toFlash.pop();
    const [flashRow, flashCol] = strToPos(flashing);

    if (flashed.includes(flashing)) continue;

    // phase 02-b: energy levels beyond maximum have flashed
    flashed.push(flashing);

    // phase 03-a: adjacent octopuses' energy levels increase by 1
    for (let [adjRow, adjCol] of aoc.fullAdjacent) {
      if (isPosValid(flashRow + adjRow, flashCol + adjCol)) {
        octopus[flashRow + adjRow][flashCol + adjCol]++;

        // phase 03-b: adjacent octopuses' energy levels beyond maximum also flash
        if (
          octopus[flashRow + adjRow][flashCol + adjCol] > maxEnergy &&
          !flashed.includes(posToStr(flashRow + adjRow, flashCol + adjCol))
        ) {
          toFlash.push(posToStr(flashRow + adjRow, flashCol + adjCol));
        }
      }
    }
  }

  // phase 04: every octopus that flashed returns to 0
  for (let flashedStr of flashed) {
    const [flashedRow, flashedCol] = strToPos(flashedStr);
    octopus[flashedRow][flashedCol] = 0;
  }

  return flashed.length;
}

// STAR 01
const octopus01: number[][] = aoc.digits(input11);
const steps01 = 100;
let flashes01 = 0;

for (let step = 0; step < steps01; step++) {
  flashes01 += octopusStep(octopus01);
}

aoc.answer(1, flashes01);

// STAR 02
const octopus02: number[][] = aoc.digits(input11);
let step02: number = 0;

do {
  step02++;
} while (octopusStep(octopus02) !== octopusAmount);

aoc.answer(2, step02);