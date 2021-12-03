import * as aoc from './utils/aoc';
import { input03 } from './inputs';

const report = aoc.lines(input03);
const reportSize = report.length;
const binarySize = report[0].length;

// STAR 01
const oneFreq = Array(binarySize).fill(0);

report.forEach(binaryNum => {
  for (let i = 0; i < binarySize; i++) { oneFreq[i] += parseInt(binaryNum[i]) }
});

const gammaArr = [];
const epsilonArr = [];

oneFreq.forEach(freq => {
  if (freq > reportSize / 2) {
    gammaArr.push('1');
    epsilonArr.push('0');
  } else {
    gammaArr.push('0');
    epsilonArr.push('1');
  }
});

const gamma = parseInt(gammaArr.join(''), 2);
const epsilon = parseInt(epsilonArr.join(''), 2);

aoc.answer(1, gamma * epsilon);

// STAR 02
let oxygenArr = [...report];
let co2Arr = [...report];

for (let i = 0; i < binarySize; i++) {
  if (oxygenArr.length == 1 && co2Arr.length == 1) break;

  if (oxygenArr.length > 1) {
    let oxygenOneFreq = 0;
    oxygenArr.forEach(bin => oxygenOneFreq += parseInt(bin[i]));

    let mostCommon;
    if (oxygenOneFreq === oxygenArr.length / 2) mostCommon = '1';
      else mostCommon = oxygenOneFreq > oxygenArr.length / 2 ? '1' : '0';

    oxygenArr = oxygenArr.filter(bin => bin[i] === mostCommon);
  }

  if (co2Arr.length > 1) {
    let co2OneFreq = 0;
    co2Arr.forEach(bin => co2OneFreq += parseInt(bin[i]));

    let leastCommon;
    if (co2OneFreq === co2Arr.length / 2) leastCommon = '0';
      else leastCommon = co2OneFreq < co2Arr.length / 2 ? '1' : '0';

    co2Arr = co2Arr.filter(bin => bin[i] === leastCommon);
  }
}

const oxygen = parseInt(oxygenArr[0], 2);
const co2 = parseInt(co2Arr[0], 2);

aoc.answer(2, oxygen * co2);