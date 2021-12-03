import * as aoc from './utils/aoc';
import { input01 } from './inputs';

const depths = aoc.ints(input01);

function countIncreases(data: number[], offset: number) {
  let increases = 0;
  let length = data.length;

  for (let i = offset; i < length; i++) {
    if (depths[i] > depths[i - offset]) increases++;
  }

  return increases;
}

// STAR 01
aoc.answer(1, countIncreases(depths, 1));

// STAR 02
aoc.answer(2, countIncreases(depths, 3));