import * as aoc from './utils/aoc';
import { input10 } from './inputs';

const lines = aoc.lines(input10);

const charMap = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};
const openChars = Object.keys(charMap);

const pointsByChar = {
  ')': { incomplete: 1, corrupted: 3 },
  ']': { incomplete: 2, corrupted: 57 },
  '}': { incomplete: 3, corrupted: 1197 },
  '>': { incomplete: 4, corrupted: 25137 },
};

// STAR 01
let corruptedPoints = 0;

// STAR 02
const incompletePoints: number[] = [];

lines.forEach(line => {
  const charArray = line.split('');
  const stack: string[] = [];
  let isIncomplete = true;

  for (let char of charArray) {
    if (openChars.includes(char)) {
      stack.push(char);
    } else { // it is a close char
      const poppedChar = stack.pop();

      if (char !== charMap[poppedChar]) { // corrupted line
        corruptedPoints += pointsByChar[char].corrupted;
        isIncomplete = false;
        break;
      }
    }
  }

  if (isIncomplete) {
    let points = 0;

    while (stack.length !== 0) {
      points *= 5;
      points += pointsByChar[charMap[stack.pop()]].incomplete;
    }

    incompletePoints.push(points);
  }
});

incompletePoints.sort((a, b) => a - b);

aoc.answer(1, corruptedPoints);
aoc.answer(2, incompletePoints[Math.trunc(incompletePoints.length / 2)]);

