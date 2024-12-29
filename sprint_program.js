const copy = (sprintCode, index) => {
  const sourceIndex = sprintCode[index + 1];
  const destinationIndex = sprintCode[index + 2];

  sprintCode[destinationIndex] = sprintCode[sourceIndex];
  return index + 3;
};

const stop = (sprintCode) => sprintCode.length;

const jump = (sprintCode, index) => {
  return sprintCode[index + 1];
};

const getIndices = (sprintCode, index) => {
  const index1 = sprintCode[index + 1];
  const index2 = sprintCode[index + 2];
  const index3 = sprintCode[index + 3];

  return [index1, index2, index3];
};

const add = (sprintCode, index) => {
  const [operand1Index, operand2Index, resultIndex] = getIndices(index);

  sprintCode[resultIndex] =
    sprintCode[operand1Index] + sprintCode[operand2Index];

  return index + 4;
};

const sub = (sprintCode, index) => {
  const [operand1Index, operand2Index, resultIndex] = getIndices(
    sprintCode,
    index
  );

  sprintCode[resultIndex] =
    sprintCode[operand1Index] - sprintCode[operand2Index];

  return index + 4;
};

const put = (sprintCode, index) => {
  const value = index + 1;
  const destinationIndex = sprintCode[index + 2];

  sprintCode[destinationIndex] = value;

  return index + 3;
};

const equal = (sprintCode, index) => {
  const [operand1Index, operand2Index, destinationIndex] = getIndices(index);

  const operand1 = sprintCode[operand1Index];
  const operand2 = sprintCode[operand2Index];

  const jumTo = operand1 === operand2 ? destinationIndex : index + 4;

  return jumTo;
};

const lessThan = (sprintCode, index) => {
  const [operand1Index, operand2Index, destinationIndex] = getIndices(index);

  const operand1 = sprintCode[operand1Index];
  const operand2 = sprintCode[operand2Index];

  const jumTo = operand1 < operand2 ? destinationIndex : index + 4;

  return jumTo;
};

const createTableWithIndexes = (sprintCode) => {
  let indexLine = "";

  for (let i = 1; i <= sprintCode.length; i++) {
    indexLine += "  " + i + " ";
  }

  const lineLength = sprintCode.length * 4.1;
  const line = "\n" + "-".repeat(lineLength) + "\n";
  const tableRow = sprintCode.map((element) => "| " + element).join(" ") + " |";

  const formattedTable = line + tableRow + line + indexLine;

  return formattedTable;
};

const processInstruction = (instruction, index, sprintCode) => {
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

  if (instruction in instructions) {
    const operation = instructions[instruction];

    return operation(sprintCode, index);
  }

  console.log("unknown instuction at index:", index + 1);
  return sprintCode.length;
};

const executeSprintCode = (sprintCode) => {
  let currentIndex = 0;

  while (currentIndex < sprintCode.length) {
    currentIndex = processInstruction(
      sprintCode[currentIndex],
      currentIndex,
      sprintCode
    );
  }

  return createTableWithIndexes(sprintCode);
};

console.log(executeSprintCode([3, 3, 9, 7, 2, 6, 0, 3, 2, 0, 10]));
