// const sprintCode = [3, 3, 9, 7, 2, 6, 0, 3, 2, 0, 10];

const copy = (sprintCode, index) => {
  const fromIndex = sprintCode[index + 1];
  const toIndex = sprintCode[index + 2];

  sprintCode[toIndex] = sprintCode[fromIndex];
  return index + 3;
};

const stop = (sprintCode) => sprintCode.length;

const jump = (sprintCode, index) => {
  return sprintCode[index + 1];
};

const getIndexs = (sprintCode, index) => {
  const index1 = sprintCode[index + 1];
  const index2 = sprintCode[index + 2];
  const index3 = sprintCode[index + 3];

  return [index1, index2, index3];
};

const add = (sprintCode, index) => {
  const [value1Index, value2Index, resultIndex] = getIndexs(index);

  sprintCode[resultIndex] = sprintCode[value1Index] + sprintCode[value2Index];

  return index + 4;
};

const sub = (sprintCode, index) => {
  const [value1Index, value2Index, resultIndex] = getIndexs(sprintCode, index);

  sprintCode[resultIndex] = sprintCode[value1Index] - sprintCode[value2Index];

  return index + 4;
};

const put = (sprintCode, index) => {
  const value = index + 1;
  const toIndex = sprintCode[index + 2];

  sprintCode[toIndex] = value;

  return index + 3;
};

const equal = (sprintCode, index) => {
  const [value1Index, value2Index, jumpTo] = getIndexs(index);

  const value1 = sprintCode[value1Index];
  const value2 = sprintCode[value2Index];

  const goTo = value1 === value2 ? jumpTo : index + 4;

  return goTo;
};

const lessThan = (sprintCode, index) => {
  const [value1Index, value2Index, jumpTo] = getIndexs(index);

  const value1 = sprintCode[value1Index];
  const value2 = sprintCode[value2Index];
  const goTo = value1 < value2 ? jumpTo : index + 4;

  return goTo;
};

const main = (value, index, sprintCode) => {
  const instructions = {
    0: put,
    1: add,
    2: sub,
    3: jump,
    4: equal,
    5: lessThan,
    7: copy,
    9: stop,
  };

  if (value in instructions) {
    const fun = instructions[value];
    index = fun(sprintCode, index);
    return index;
  }

  console.log("unknown instuction at index:", index + 1);
  return sprintCode.length;
};

const getIndex = (sprintCode) => {
  let indexs = "";

  for (let i = 1; i <= sprintCode.length; i++) {
    indexs += "  " + i + " ";
  }

  return indexs;
};

const executeSprintCode = (sprintCode) => {
  let index = 0;

  while (index < sprintCode.length) {
    index = main(sprintCode[index], index, sprintCode);
  }

  const indexs = getIndex(sprintCode);
  const times = sprintCode.length * 4.1;
  const line = "\n" + "-".repeat(times) + "\n";
  const box = sprintCode.map((element) => "| " + element).join(" ") + " |";

  const result = line + box + line + indexs;

  return result;
};

console.log(executeSprintCode([3, 3, 9, 7, 2, 6, 0, 3, 2, 0, 10]));
