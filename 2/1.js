const fs = require('fs');

const rawIntCode = fs.readFileSync(__dirname + '/input', 'utf8');

function getPosition0OfProcessedIntCode(input) {
  const intCode = get1202ProgramAlarmState(input);
  return processIntCode(intCode)[0];
}

function get1202ProgramAlarmState(input) {
  const result = input.split(',');
  for (let i = 0; i < result.length; i++) {
    result[i] = Number(result[i]);
    if (i === 1) result[i] = 12;
    if (i === 2) result[i] = 2;
  }
  return result;
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

console.log(getPosition0OfProcessedIntCode(rawIntCode));
