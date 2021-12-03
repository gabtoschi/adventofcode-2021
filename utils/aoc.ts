export function lines(data: string): string[] {
  return data.split('\n').map(line => line.trim());
}

export function ints(data: string): number[] {
  return data.split('\n').map(line => parseInt(line));
}

export function answer(star: 1 | 2, answer: any) {
  console.log(`Star #0${star}: ${answer.toString()}`);
}