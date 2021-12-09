import * as aoc from './utils/aoc';
import { input09 } from './inputs';

const map = aoc.lines(input09).map(line => line.split('').map(char => parseInt(char)));
const mapHeight = map.length;
const mapWidth = map[0].length;

const adjacent = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const isPositionValid = (row: number, col: number) => (row >= 0 && row < mapHeight && col >= 0 && col < mapWidth);

// STAR 01
let lowPoints: number[][] = [];
let maxRiskLevel = 0;

for (let row = 0; row < mapHeight; row++) {
  for (let col = 0; col < mapWidth; col++) {
    let isLowPoint = true;

    for (let [adjRow, adjCol] of adjacent) {
      if (isPositionValid(row + adjRow, col + adjCol) && map[row + adjRow][col + adjCol] <= map[row][col]) {
        isLowPoint = false;
        break;
      }
    }

    if (isLowPoint) {
      lowPoints.push([row, col]);
      maxRiskLevel += map[row][col] + 1;
    };
  }
}

aoc.answer(1, maxRiskLevel);

// STAR 02
const visited = -1;
const block = 9;

const basinSizes: number[] = [];

lowPoints.forEach(lowPoint => {
  const stack = [];
  stack.push(lowPoint);

  let basinSize = 0;

  while (stack.length > 0) {
    const [curRow, curCol] = stack.pop();

    for (let [adjRow, adjCol] of adjacent) {
      if (
        isPositionValid(curRow + adjRow, curCol + adjCol) &&
        map[curRow + adjRow][curCol + adjCol] !== visited &&
        map[curRow + adjRow][curCol + adjCol] !== block
      ) {
        stack.push([curRow + adjRow, curCol + adjCol]);
        map[curRow + adjRow][curCol + adjCol] = visited;
        basinSize++;
      }
    }
  }

  basinSizes.push(basinSize);
});

basinSizes.sort((a, b) => b - a);
aoc.answer(2, basinSizes[0] * basinSizes[1] * basinSizes[2]);