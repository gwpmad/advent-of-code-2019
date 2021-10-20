const fs = require('fs');
const intCode = fs.readFileSync(__dirname + '/input', 'utf8');

const ints = intCode.split(',');

function processIntCode(index = 0) {
  for (let i = index; i < ints.length;) {
    const value = ints[i];
    if (value === '99') return;
    const { modes, opcode } = parseOpcodeValue(value);
    const paramsLength = opcodeParamLengthLookup[opcode];
    opcodeHandlers[opcode](modes, i, paramsLength);
    if (opcode === '3') return;
    i += (paramsLength+1);
  }
}

const opcodeParamLengthLookup = {
  1: 3,
  2: 3,
  3: 1,
  4: 1,
};

const opcodeHandlers = {
  1: (modes, i, paramsLength) => {
    const params = getParams(i, modes, paramsLength);
    ints[params[2]] = String(params[0] + params[1]);
  },
  2: (modes, i, paramsLength) => {
    const params = getParams(i, modes, paramsLength);
    ints[params[2]] = String(params[0] * params[1]);
  },
  3: (modes, i, paramsLength) => {
    const params = getParams(i, modes, paramsLength);
    console.log('input required')
    const callback = (data) => {
      process.stdin.removeListener('data', callback);
      process.stdin.pause();
      const param = Number(params[0]);
      ints[param] = data.toString();
      processIntCode(i+2);
    };
    process.stdin.resume();
    process.stdin.on('data', callback);
  },
  4: (modes, i, paramsLength) => {
    const [param] = getParams(i, modes, paramsLength, '4');
    console.log(param);
  }
};

function parseOpcodeValue(value) {
  const modes = [];
  const reversedValue = value.split('').reverse();
  const opcode = reversedValue[0];
  for (let i = 2; i <= 4; i++) {
    let mode = reversedValue[i];
    if (mode === undefined) mode = '0';
    modes.push(mode);
  }

  return { modes, opcode };
}

function getParams(intCodeIdx, modes, paramsLength, opcode) {
  const params = [];
  for (let i = 0; i < paramsLength; i++) {
    const initialParam = ints[intCodeIdx + i + 1];
    if (i === (paramsLength-1) && opcode !== '4') {
      params.push(initialParam);
      continue;
    }
    params.push(Number(modes[i] === '0' ? ints[initialParam] : initialParam));
  }
  return params;
}

processIntCode();