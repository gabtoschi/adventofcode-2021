import * as aoc from './utils/aoc';
import { input14 } from './inputs';

const addFrequency = (freq: Map<string, number>, key: string, amount: number) =>
  freq.set(key, freq.get(key) + amount || amount);

let [templateStr, insertionsStr] = input14.split('\n\n').map(input => aoc.lines(input));

let template = templateStr[0].split('');
let insertions = new Map<string, string>();
for (let insertion of insertionsStr) {
  const [toMatch, toInsert] = insertion.split(' -> ');
  insertions.set(toMatch, toInsert);
}

function polymerization(template: string[], insertions: Map<string, string>, steps: number): number {
  const elementFrequency = new Map<string, number>();
  let pairFrequency = new Map<string, number>();

  for (let firstInPair = 0; firstInPair < template.length - 1; firstInPair++) {
    const pair = template[firstInPair] + template[firstInPair + 1];

    addFrequency(elementFrequency, template[firstInPair], 1);
    addFrequency(pairFrequency, pair, 1);
  }
  addFrequency(elementFrequency, template[template.length - 1], 1);

  for (let step = 0; step < steps; step++) {
    const currentPairs = Array.from(pairFrequency.keys());
    const newPairFrequency = new Map<string, number>();

    for (let pair of currentPairs) {
      const pairAmount = pairFrequency.get(pair);
      const newElement = insertions.get(pair);
      const [firstPairElement, lastPairElement] = pair.split('');

      addFrequency(elementFrequency, newElement, pairAmount);
      addFrequency(newPairFrequency, firstPairElement + newElement, pairAmount);
      addFrequency(newPairFrequency, newElement + lastPairElement, pairAmount);
    }

    pairFrequency = newPairFrequency;
  }

  const elementsOrdered = Array.from(elementFrequency.keys()).sort((a, b) => elementFrequency.get(b) - elementFrequency.get(a));
  return elementFrequency.get(elementsOrdered[0]) - elementFrequency.get(elementsOrdered[elementsOrdered.length - 1]);
}

// STAR 01
aoc.answer(1, polymerization(template, insertions, 10));

// STAR 02
aoc.answer(2, polymerization(template, insertions, 40));