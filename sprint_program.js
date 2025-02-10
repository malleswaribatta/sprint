import { fn } from "./functions.js";

const copy = (memory, instructionAddress) => {
  const [sourceAddress, destinationAddress] = memory.slice(
    instructionAddress + 1,
    instructionAddress + 3
  );

  memory[destinationAddress] = memory[sourceAddress];

  return { isHalted: false, programCounter: instructionAddress + 3 };
};

const halt = (memory, programCounter) => ({
  isHalted: true,
  programCounter,
});

const jump = (memory, programCounter) => {
  return { isHalted: false, programCounter: memory[programCounter + 1] };
};

const getIndices = (memory, address) => {
  return memory.slice(address + 1, address + 4);
};

const add = (memory, instructionAddress) => {
  const [operand1Address, operand2Address, resultAddress] = getIndices(
    memory,
    instructionAddress
  );

  memory[resultAddress] = memory[operand1Address] + memory[operand2Address];

  return { isHalted: false, programCounter: instructionAddress + 4 };
};

const sub = (memory, instructionAddress) => {
  const [operand1Address, operand2Address, resultAddress] = getIndices(
    memory,
    instructionAddress
  );

  memory[resultAddress] = memory[operand1Address] - memory[operand2Address];

  return { isHalted: false, programCounter: instructionAddress + 4 };
};

const put = (memory, instructionAddress) => {
  const value = instructionAddress + 1;
  const destinationAddress = memory[instructionAddress + 2];

  memory[destinationAddress] = value;

  return { isHalted: false, programCounter: instructionAddress + 3 };
};

const equal = (memory, instructionAddress) => {
  const [operand1Address, operand2Address, destinationAddress] =
    getIndices(instructionAddress);

  const operand1 = memory[operand1Address];
  const operand2 = memory[operand2Address];

  const jumTo =
    operand1 === operand2 ? destinationAddress : instructionAddress + 4;

  return { isHalted: false, programCounter: jumTo };
};

const lessThan = (memory, instructionAddress) => {
  const [operand1Address, operand2Address, destinationAddress] =
    getIndices(instructionAddress);

  const operand1 = memory[operand1Address];
  const operand2 = memory[operand2Address];

  const jumTo =
    operand1 < operand2 ? destinationAddress : instructionAddress + 4;

  return { isHalted: false, programCounter: jumTo };
};

export const processInstruction = (programCounter, memory) => {
  const instruction = memory[programCounter];
  const instructions = {
    0: put,
    1: add,
    2: sub,
    3: jump,
    4: equal,
    5: lessThan,
    7: copy,
    8: fn,
    9: halt,
  };

  if (instruction in instructions) {
    const operation = instructions[instruction];

    return operation(memory, programCounter);
  }

  console.log("unknown instuction at Address:", programCounter);
  return { isHalted: true, programCounter };
};

const executeSprintCode = (memory) => {
  let programState = {
    programCounter: 0,
    isHalted: false,
  };

  while (!programState.isHalted) {
    programState = processInstruction(programState.programCounter, memory);
  }

  return [memory];
};

console.table(
  executeSprintCode([
    8, 1999, 2, 10, 20, 8, 0, 9, 99, 1999, 0, 0, 1, 10, 11, 6, 3, 7, 9,
  ])
);
