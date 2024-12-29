import { test } from "/Users/battamalleswari/workspace/objects/Assignment/js-import-export-malleswaribatta/functions_test.js";

const sprintCode = [1, 5, 6, 7, 9, 1, 2, 0];

const copy = (index) => {
  const fromIndex = sprintCode[index + 1];
  const toIndex = sprintCode[index + 2];

  sprintCode[toIndex] = sprintCode[fromIndex];
  return index + 3;
};

const stop = () => sprintCode.length;

const jump = (index) => {
  return sprintCode[index + 1];
};

const add = (index) => {
  const value1Index = sprintCode[index + 1];
  const value2Index = sprintCode[index + 2];
  const resultIndex = sprintCode[index + 3];
  sprintCode[resultIndex] = sprintCode[value1Index] + sprintCode[value2Index];

  return index + 4;
};

const sub = (index) => {
  const value1Index = sprintCode[index + 1];
  const value2Index = sprintCode[index + 2];
  const resultIndex = sprintCode[index + 3];
  sprintCode[resultIndex] = sprintCode[value1Index] - sprintCode[value2Index];

  return index + 4;
};

const move = (index) => {
  const value = index + 1;
  const toIndex = sprintCode[index + 2];

  sprintCode[toIndex] = value;

  return index + 3;
};

const equal = (index) => {
  const value1Index = sprintCode[index + 1];
  const value2Index = sprintCode[index + 2];
  const jumpTo = sprintCode[index + 3];
  const value1 = sprintCode[value1Index];
  const value2 = sprintCode[value2Index];

  if (value1 === value2) {
    return jumpTo;
  }

  return index + 4;
};

const lessThan = (index) => {
  const value1Index = sprintCode[index + 1];
  const value2Index = sprintCode[index + 2];
  const jumpTo = sprintCode[index + 3];
  const value1 = sprintCode[value1Index];
  const value2 = sprintCode[value2Index];

  if (value1 < value2) {
    return jumpTo;
  }

  return index + 4;
};

const instructions = {
  0: move,
  1: add,
  2: sub,
  3: jump,
  4: equal,
  5: lessThan,
  7: copy,
  9: stop,
};

const main = (value, index) => {
  if (value in instructions) {
    const fun = instructions[value];
    index = fun(index);
  }

  return index;
};

const executeSprintCode = () => {
  let index = 0;

  while (index < sprintCode.length) {
    index = main(sprintCode[index], index);
  }

  console.log(test([1, 5, 6, 7, 9, 1, 2, 3], sprintCode));
};

executeSprintCode();
