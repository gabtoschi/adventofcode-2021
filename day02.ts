import * as aoc from './utils/aoc';
import { input02 } from './inputs';

const commands = aoc.lines(input02);

function pilotSubmarine(sub: any, commands: string[]) {
  commands.forEach(command => {
    const [func, value] = command.split(' ');
    sub[func](parseInt(value));
  });
}

// STAR 01
const sub01 = {
  depth: 0,
  horizontal: 0,
  forward(value: number) { this.horizontal += value },
  down(value: number) { this.depth += value },
  up(value: number) { this.depth -= value },
}

pilotSubmarine(sub01, commands);
aoc.answer(1, sub01.depth * sub01.horizontal);

// STAR 02
const sub02 = {
  depth: 0,
  horizontal: 0,
  aim: 0,
  down(value: number) { this.aim += value },
  up(value: number) { this.aim -= value },
  forward(value: number) {
    this.horizontal += value;
    this.depth += (this.aim * value);
  },
}

pilotSubmarine(sub02, commands);
aoc.answer(2, sub02.depth * sub02.horizontal);