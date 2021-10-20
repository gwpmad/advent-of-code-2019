const fs = require('fs');
const intCode = fs.readFileSync(__dirname + '/input', 'utf8');

const ints = intCode.split(',');

function processIntCode(index = 0) {
  for (let i = index; i < ints.length;) {
    const value = ints[i];
    if (value === '99') return;
    const { modes, opcode } = parseOpcodeValue(value);
    switch (opcode) {
      case '1':
        opcodeHandlers[1](modes, i);
        i += 4;
        break;
      case '2':
        opcodeHandlers[2](modes, i);
        i += 4;
        break;
      case '3':
        opcodeHandlers[3](modes, i);
        return;
      case '4':4
        opcodeHandlers[4](modes, i);
        i += 2;
        break;
      default:
        throw new Error('should only be 1 2 3 or 4');
    }
  }
}

const opcodeHandlers = {
  1: (modes, i) => {
    const params = getParams(i, modes, 3);
    ints[params[2]] = String(params[0] + params[1]);
  },
  2: (modes, i) => {
    const params = getParams(i, modes, 3);
    ints[params[2]] = String(params[0] * params[1]);
  },
  3: (modes, i) => {
    console.log('input required')
    const callback = (data) => {
      process.stdin.removeListener('data', callback);
      process.stdin.pause();
      const location = Number(ints[i + 1]);
      ints[location] = data.toString();
      processIntCode(i+2);
    };
    process.stdin.resume();
    process.stdin.on('data', callback);
  },
  4: (modes, i) => {
    const [param] = getParams(i, modes, 1);
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

function getParams(intCodeIdx, modes, paramLength) {
  const params = [];
  for (let i = 0; i < paramLength; i++) {
    const initialParam = ints[intCodeIdx + i + 1];
    if (i === 2) {
      params.push(initialParam);
      continue;
    }
    params.push(Number(modes[i] === '0' ? ints[initialParam] : initialParam));
  }
  return params;
}

processIntCode();