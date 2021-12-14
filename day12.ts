import * as aoc from './utils/aoc';
import { input12 } from './inputs';

const isSmallCave = (cave: string) => (cave === cave.toLowerCase());
const isAlreadyVisited = (cave: string, visited: string[]) => (visited.includes(cave));

const input = aoc.lines(input12);

const graph = new Map<string, string[]>();
for (let line of input) {
  const vertexTuples = [line.split('-'), line.split('-').reverse()];

  for (let [vertex1, vertex2] of vertexTuples) {
    if (vertex1 !== 'end' && vertex2 !== 'start') {
      graph.set(vertex1, [...graph.get(vertex1) || [], vertex2]);
    }
  }
}

function caveDFS(
  cave: string,
  currentPath: string[],
  total: number,
  goToNextCave: (cave: string, path: string[]) => boolean,
): number {
  currentPath.push(cave);

  if (cave === 'end') {
    currentPath.pop();
    return total + 1;
  }

  const nextCaves = graph.get(cave);
  for (let nextCave of nextCaves) {
    if (goToNextCave(nextCave, currentPath)) {
      total = caveDFS(nextCave, currentPath, total, goToNextCave);
    }
  }

  currentPath.pop();

  return total;
}

// STAR 01
aoc.answer(1, caveDFS(
  'start', [], 0,
  (cave, path) => (!(isSmallCave(cave) && isAlreadyVisited(cave, path))),
));

// STAR 02
aoc.answer(2, caveDFS(
  'start', [], 0,
  (cave, path) => {
    if (!isSmallCave(cave) || !isAlreadyVisited(cave, path)) return true;

    const smallCaves = path.filter(cave => (isSmallCave(cave)));
    const uniqueSmallCaves = new Set(smallCaves);
    return smallCaves.length === uniqueSmallCaves.size; // no duplicates yet
  },
));


