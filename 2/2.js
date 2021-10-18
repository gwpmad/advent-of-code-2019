const fs = require('fs');

const DESIRED_OUTPUT = 19690720;
const rawIntCode = fs.readFileSync(__dirname + '/input', 'utf8');

function doNounAndVerbArithmetic(noun, verb) {
  return (100 * noun) + verb;
}

function getNounAndVerbForDesiredOutput(input) {
  const originalIntCode = input.split(',').map(Number);
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const intCode = getFreshIntCodeWithNounVerb(originalIntCode, noun, verb);
      const processedIntCode = processIntCode(intCode);
      console.log('processedIntCode', processedIntCode)
      if (processedIntCode[0] === DESIRED_OUTPUT) return { noun, verb };
    }
  }
}

function getFreshIntCodeWithNounVerb(intCode, noun, verb) {
  const intCodeClone = [...intCode];
  intCodeClone[1] = noun;
  intCodeClone[2] = verb;
  return intCodeClone;
}

function processIntCode(intCode) {
  const operations = getOperations(intCode);
  for (let i = 0; i < intCode.length; i+=4) {
    const op = intCode[i], pos1 = intCode[i+1], pos2 = intCode[i+2], pos3 = intCode[i+3];
    if (op === 99) break;
    intCode[pos3] = operations[op](pos1, pos2);
  }
  return intCode;
}

function getOperations(intCode) {
  return {
    1: (pos1, pos2) => intCode[pos1] + intCode[pos2],
    2: (pos1, pos2) => intCode[pos1] * intCode[pos2],
  };
}

const { noun, verb } = getNounAndVerbForDesiredOutput(rawIntCode);
console.log(doNounAndVerbArithmetic(noun, verb));
