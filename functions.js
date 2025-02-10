import { processInstruction } from "./sprint_program.js";

const info = (memory, programCounter) => {
  const [name, length, ...args] = memory.slice(
    programCounter,
    memory[programCounter + 1] + 4
  );

  return [name, length, args.pop(), args];
};

//[
  // 8, 1999, 2, 10, 20, 8, 0, 9, 99, 1999, 0, 0, 1, 10, 11, 6, 3, 7, 9,
// ]
const fnDef = (length, programCounter, args, memory) => {
  const argsEnd = length + programCounter + 2;
  
  for (let i = programCounter + 2; i < argsEnd; i++) {
    memory[i] = args.shift();
  }

  processInstruction(argsEnd, memory);
};

export const fn = (memory, programCounter) => {
  const [nameFn, length, fnDefinitionLocation, args] = info(
    memory,
    programCounter + 1
  );

  fnDef(length, fnDefinitionLocation, args, memory);

  return { isHalted: false, programCounter: fnDefinitionLocation - 1 }
};
