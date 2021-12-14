import * as aoc from './utils/aoc';
import { input13 } from './inputs';

let [dots, folds] = input13.split('\n\n').map(input => aoc.lines(input));
folds = folds.map(foldInst => foldInst.replace('fold along ', ''));

function fold(dots: string[], fold: 'x' | 'y', position: number): string[] {
  const folded = new Set<string>();

  for (let dot of dots) {
    let [x, y] = dot.split(',').map(str => parseInt(str));

    if (fold === 'y' && y >= position) {
      y = y - ((y - position) * 2);
    }

    if (fold === 'x' && x >= position) {
      x = x - ((x - position) * 2);
    }

    folded.add(`${x},${y}`);
  }

  return Array.from(folded);
}

// STAR 01
const [firstFold, firstFoldNumber] = folds[0].split('=');
aoc.answer(1, fold(dots, firstFold as 'x' | 'y', parseInt(firstFoldNumber)).length);

// STAR 02
let paper = dots;

for (let foldCommand of folds) {
  const [instruction, number] = foldCommand.split('=');
  paper = fold(paper, instruction as 'x' | 'y', parseInt(number));
}

// "printing" the paper
let maxX = -1;
let maxY = -1;

for (let dot of paper) {
  const [x, y] = dot.split(',').map(str => parseInt(str));
  if (x > maxX) maxX = x;
  if (y > maxY) maxY = y;
}

const paperMatrix: string[][] = new Array(maxY + 1);
for (let i = 0; i <= maxY; i++) paperMatrix[i] = new Array(maxX + 1).fill('.');

for (let dot of paper) {
  const [x, y] = dot.split(',').map(str => parseInt(str));
  paperMatrix[y][x] = '#';
}

aoc.answer(2, '')
for (let paperLine of paperMatrix) console.log(paperLine.join(' '));