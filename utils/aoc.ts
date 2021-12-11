export function lines(data: string, separator = '\n'): string[] {
  return data.split(separator).map(line => line.trim());
}

export function ints(data: string, separator = '\n'): number[] {
  return data.split(separator).map(line => parseInt(line));
}

export function digits(data: string, lineSeparator = '\n'): number[][] {
  return lines(data, lineSeparator)
    .map(line => line.split('').map(char => parseInt(char)));
}

export function answer(star: 1 | 2, answer: any) {
  console.log(`Star #0${star}: ${answer.toString()}`);
}