import * as aoc from './utils/aoc';
import { input08 } from './inputs';

interface Entry {
  patterns: string[];
  output: string[];
}

const sortChars = (str: string) => (str.split('').sort().join(''));
const filterByLength = (arr: string[], len: number) => arr.filter(str => str.length === len);
const charIntersection = (str1: string, str2: string) => str1.split('').filter(c => str2.split('').includes(c));
const removeFromArray = (arr: any[], el: any) => arr.splice(arr.indexOf(el), 1);

const entries: Entry[] = aoc.lines(input08).map(line => {
  const [patterns, output] = line.split(' | ');

  return {
    patterns: patterns.split(' ').map(str => sortChars(str)),
    output: output.split(' ').map(str => sortChars(str)),
  }
});

// STAR 01
const easyDigitsLengths = [2, 3, 4, 7];
let easyDigitsCount = 0;

entries.forEach(entry => {
  entry.output.forEach(str => {
    if (easyDigitsLengths.includes(str.length)) easyDigitsCount++;
  });
});

aoc.answer(1, easyDigitsCount);

// STAR 02
let outputSum = 0;

entries.forEach(entry => {
  const numbers: string[] = new Array(10).fill('');

  // obvious numbers (by length)
  [[1, 2], [7, 3], [4, 4], [8, 7]].forEach(([num, length])=> {
    numbers[num] = filterByLength(entry.patterns, length)[0];
  });

  // possible numbers of other lengths
  const possible235 = filterByLength(entry.patterns, 5);
  const possible069 = filterByLength(entry.patterns, 6);

  // between 0, 6 and 9, only 6 hasn't 1 inside
  numbers[6] = possible069.filter(pattern => {
    return charIntersection(numbers[1], pattern).length < numbers[1].length;
  })[0];

  removeFromArray(possible069, numbers[6]);

  // between 0 and 9, only 9 has 4 inside
  numbers[9] = possible069.filter(pattern => {
    return charIntersection(numbers[4], pattern).length === numbers[4].length;
  })[0];

  removeFromArray(possible069, numbers[9]);
  numbers[0] = possible069[0];

  // between 2, 3 and 5, only 3 has 1 inside
  numbers[3] = possible235.filter(pattern => {
    return charIntersection(numbers[1], pattern).length === numbers[1].length;
  })[0];

  removeFromArray(possible235, numbers[3]);

  // between 2 and 5, only 5 has almost 6 inside (apart for 1 segment)
  numbers[5] = possible235.filter(pattern => {
    return charIntersection(numbers[6], pattern).length === numbers[6].length - 1;
  })[0];

  removeFromArray(possible235, numbers[5]);
  numbers[2] = possible235[0];

  // decoding the output
  const numbersMap = {};
  numbers.forEach((value, index) => numbersMap[value] = index);

  const decoded = parseInt(entry.output.map(coded => numbersMap[coded]).join(''));
  outputSum += decoded;
});

aoc.answer(2, outputSum);