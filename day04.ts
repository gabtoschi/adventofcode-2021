import * as aoc from './utils/aoc';
import { input04 } from './inputs';

const BOARD_SIZE = 5;

class BingoBoard {
  numbers: string[];
  rowMatch: number[];
  columnMatch: number[];
  winnerNumber: number | null;

  constructor(rawNumbers: string) {
    this.numbers = rawNumbers.split(' ').filter(str => str != '');
    this.rowMatch = Array(BOARD_SIZE).fill(0),
    this.columnMatch =  Array(BOARD_SIZE).fill(0),
    this.winnerNumber = null;
  }

  matchNumber(toMatch: string): boolean {
    const drawnBoardIndex = this.numbers.indexOf(toMatch);

    if (drawnBoardIndex !== -1) {
      const rowIndex = Math.trunc(drawnBoardIndex / BOARD_SIZE);
      const columnIndex = drawnBoardIndex % BOARD_SIZE;

      this.rowMatch[rowIndex]++;
      this.columnMatch[columnIndex]++;

      this.numbers[drawnBoardIndex] += '*';

      if (this.rowMatch.some(counter => counter >= BOARD_SIZE) || this.columnMatch.some(counter => counter >= BOARD_SIZE)) {
        this.winnerNumber = parseInt(toMatch);
        return true;
      }
    }

    return false;
  }

  getScore(): number {
    if (!this.winnerNumber) return -1;

    let unmarkedSum = 0;
    this.numbers.forEach(number => {
      if (number.indexOf('*') === -1) unmarkedSum += parseInt(number);
    });

    return unmarkedSum * this.winnerNumber;
  }
}

const bingoRawData = aoc.lines(input04).filter(str => str !== '');

const drawnNumbers = bingoRawData.splice(0, 1)[0].split(',');
const boardNumbers = Array(bingoRawData.length / BOARD_SIZE).fill('');

bingoRawData.forEach((rawLine, index) => {
  boardNumbers[Math.trunc(index / BOARD_SIZE)] += rawLine + ' ';
});

// STAR 01
const boards01 = boardNumbers.map(numbers => new BingoBoard(numbers));
let winnerBoard: BingoBoard = null;

for (let drawn of drawnNumbers) {
  for (let board of boards01) {
    if (board.matchNumber(drawn)) {
      winnerBoard = board;
      break;
    }
  }

  if (winnerBoard) break;
}

aoc.answer(1, winnerBoard.getScore());

// STAR 02
let boards02 = boardNumbers.map(numbers => new BingoBoard(numbers));

for (let drawn of drawnNumbers) {
  const boardsRemaining = [];

  for (let board of boards02) {
    const isWinner = board.matchNumber(drawn);

    if (boards02.length === 1 || !isWinner) {
      boardsRemaining.push(board);
    }
  }

  boards02 = boardsRemaining;

  if (boards02.length === 1 && boards02[0].winnerNumber) {
    break;
  }
}

aoc.answer(2, boards02[0].getScore());