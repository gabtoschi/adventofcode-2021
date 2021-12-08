import * as aoc from './utils/aoc';
import { input06 } from './inputs';

const fish = aoc.lines(input06)[0].split(',').map(str => parseInt(str));

function simulateFish(originalFish: number[], days: number, cycleMax = 6, birthDelay = 2): number {
  const newbornStartTimer = cycleMax + birthDelay;

  const fishFreq = Array(newbornStartTimer + 1).fill(0);
  originalFish.forEach(fish => fishFreq[fish]++);

  for (let day = 0; day < days; day++) {
    const births = fishFreq[0];

    for (let i = 1; i <= newbornStartTimer; i++) {
      fishFreq[i - 1] = fishFreq[i];
    }
    fishFreq[newbornStartTimer] = 0;

    if (births > 0) {
      fishFreq[cycleMax] += births;
      fishFreq[newbornStartTimer] += births;
    }
  }

  return fishFreq.reduce((prev, cur) => prev + cur);
}

// STAR 01
aoc.answer(1, simulateFish(fish, 80));

// STAR 02
aoc.answer(2, simulateFish(fish, 256));

