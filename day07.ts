import * as aoc from './utils/aoc';
import { input07 } from './inputs/input07';

const crabs = aoc.ints(input07, ',').sort((a, b) => a - b);

// STAR 01
const median = crabs[Math.trunc(crabs.length / 2)];
let fuel1 = 0;

crabs.forEach(crab => fuel1 += Math.abs(crab - median));

aoc.answer(1, fuel1);

// STAR 02
const max = crabs.reduce((a, b) => Math.max(a, b));
const fuel2 = Array(max).fill(0);

const getFuelExpended = (distance: number) => (((1 + distance) * distance) / 2);

crabs.forEach(crab => {
  for (let i = 0; i < max; i++) {
    fuel2[i] += getFuelExpended(Math.abs(crab - i));
  }
});

let minIndex = 0;
fuel2.forEach((value, index) => {
  if (value < fuel2[minIndex]) minIndex = index;
});

aoc.answer(2, fuel2[minIndex]);