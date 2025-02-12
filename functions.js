import { processInstruction } from "./sprint_program.js";

const extractInstructionData = (memory, programCounter) => {
  const endOfFnCall = memory[programCounter + 1] + 4;
  const [name, length, ...args] = memory.slice(
    programCounter,
    endOfFnCall
  );

  const functionDefStartsLocation = args.pop();

  return [name, length, functionDefStartsLocation, args];
};

const executeFnDefinition = (length, programCounter, args, memory) => {
  const argsEndIndex = length + programCounter;

  for (let i = programCounter; i < argsEndIndex; i++) {
    memory[i] = args.shift();
  }

  processInstruction(argsEndIndex, memory);
};

export const executeFunction = (memory, programCounter) => {
  const [functionName, length, fnDefinitionLocation, args] =
    extractInstructionData(memory, programCounter + 1);

  executeFnDefinition(length, fnDefinitionLocation + 2, args, memory);

  return { isHalted: false, programCounter: fnDefinitionLocation - 1 };
};

//[
// instruction:8, 
// fnName:1999, 
// lengthOfArgs:2, 
// arg1:10, 
// arg2:20, 
// fnDefLocation:8, 
// retrunValue:0, 
// 9, 
// codeFnDef:99, 
// fnName:1999, 
// arg1:0, 
// arg2:0,                       
// remaing code 1, 10, 11, 6, 3, 7, 9,
// ]

