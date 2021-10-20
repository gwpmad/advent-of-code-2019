// part 1: answer 1 to prompt
// part 2: answer 5 to prompt

function processIntCode(_options = {}) {
  const options = getOptions(_options);
  
  const opcodeHandlers = getOpcodeHandlers(options);
  
  const { index, ints } = options;
  for (let i = index; i < ints.length;) {
    const value = ints[i];
    if (value === '99') return;
    const { modes, opcode } = parseOpcodeValue(value);
    const paramsLength = opcodeToParamLength[opcode];
    const result = opcodeHandlers[opcode](modes, i, paramsLength);
  
    let pointerLocation = i + paramsLength + 1;
    if (result) {
      if (result.pauseForInput) return;
      if (result.pointerLocation !== undefined) pointerLocation = result.pointerLocation; 
    }
    i = pointerLocation;
  }
}

const opcodeToParamLength = {
  1: 3,
  2: 3,
  3: 1,
  4: 1,
  5: 2,
  6: 2,
  7: 3,
  8: 3,
};

const opcodesWhereFinalParamIsLocation = ['1', '2', '3', '7', '8'];

function getOpcodeHandlers({
  ints,
  log,
  stdin
}) {
  return {
    1: (modes, i, paramsLength) => {
      const params = getParams(ints, i, modes, paramsLength, '1');
      ints[params[2]] = String(Number(params[0]) + Number(params[1]));
    },
    2: (modes, i, paramsLength) => {
      const params = getParams(ints, i, modes, paramsLength, '2');
      ints[params[2]] = String(Number(params[0]) * Number(params[1]));
    },
    3: (modes, i, paramsLength) => {
      const params = getParams(ints, i, modes, paramsLength, '3');
      log('input required')
      const callback = (data) => {
        stdin.removeListener('data', callback);
        stdin.pause();
        const param = Number(params[0]);
        ints[param] = data.toString();
        processIntCode({ index: i+2, ints, stdin, log });
      };
      stdin.resume();
      stdin.on('data', callback);
      return { pauseForInput: true }
    },
    4: (modes, i, paramsLength) => {
      const [param] = getParams(ints, i, modes, paramsLength, '4');
      log(param);
    },
    5: (modes, i, paramsLength) => {
      const params = getParams(ints, i, modes, paramsLength, '5');
      if (params[0] === '0') return;
      return { pointerLocation: Number(params[1]) };
    },
    6: (modes, i, paramsLength) => {
      const params = getParams(ints, i, modes, paramsLength, '6');
      if (params[0] !== '0') return;
      return { pointerLocation: Number(params[1]) };
    },
    7: (modes, i, paramsLength) => {
      const params = getParams(ints, i, modes, paramsLength, '7');
      const output = Number(params[0]) < Number(params[1]) ? '1' : '0';
      ints[params[2]] = output;
    },
    8: (modes, i, paramsLength) => {
      const params = getParams(ints, i, modes, paramsLength, '8');
      const output = params[0] === params[1] ? '1' : '0';
      ints[params[2]] = output;
    }
  };
}

function getParams(ints, intCodeIdx, modes, paramsLength, opcode) {
  const params = [];
  for (let i = 0; i < paramsLength; i++) {
    const initialParam = ints[intCodeIdx + i + 1];
    if (i === (paramsLength - 1) && opcodesWhereFinalParamIsLocation.includes(opcode)) {
      params.push(initialParam);
      continue;
    }
    params.push(modes[i] === '0' ? ints[initialParam] : initialParam);
  }
  return params;
}

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

function getOptions({
  index,
  ints,
  stdin,
  log
}) {
  return {
    index: index || 0,
    ints: ints || require('fs').readFileSync(__dirname + '/input', 'utf8').split(','),
    stdin: stdin || process.stdin,
    log: log || console.log.bind(console),
  }
}

processIntCode();

// Uncomment below code to run tests
// const logs = [];
// const testDict = {
//   1: {
//     input: '1',
//     assertion: () => require('assert').deepEqual(logs, ['input required', 0, 0, 0, 0, 0, 0, 0, 0, 0, 13978427]),
//   },
//   2: {
//     input: '5',
//     assertion: () => require('assert').deepEqual(logs, ['input required', 11189491]),
//   },
//   inputEqualTo8: {
//     ints: '3,9,8,9,10,9,4,9,99,-1,8'.split(','),
//     input: '8',
//     assertion: () => require('assert').deepEqual(logs, ['input required', 1]),
//   },
//   inputNotEqualTo8: {
//     ints: '3,9,8,9,10,9,4,9,99,-1,8'.split(','),
//     input: '7',
//     assertion: () => require('assert').deepEqual(logs, ['input required', 0]),
//   },
//   inputEqualTo8ImmediateMode: {
//     ints: '3,3,1108,-1,8,3,4,3,99'.split(','),
//     input: '8',
//     assertion: () => require('assert').deepEqual(logs, ['input required', 1]),
//   },
//   inputNotEqualTo8ImmediateMode: {
//     ints: '3,3,1108,-1,8,3,4,3,99'.split(','),
//     input: '7',
//     assertion: () => require('assert').deepEqual(logs, ['input required', 0]),
//   },
//   inputLessThan8: {
//     ints: '3,9,7,9,10,9,4,9,99,-1,8'.split(','),
//     input: '7',
//     assertion: () => require('assert').deepEqual(logs, ['input required', 1]),
//   },
//   inputNotLessThan8: {
//     ints: '3,9,7,9,10,9,4,9,99,-1,8'.split(','),
//     input: '8',
//     assertion: () => require('assert').deepEqual(logs, ['input required', 0]),
//   },
//   inputLessThan8ImmediateMode: {
//     ints: '3,3,1107,-1,8,3,4,3,99'.split(','),
//     input: '7',
//     assertion: () => require('assert').deepEqual(logs, ['input required', 1]),
//   },
//   inputNotLessThan8ImmediateMode: {
//     ints: '3,3,1107,-1,8,3,4,3,99'.split(','),
//     input: '8',
//     assertion: () => require('assert').deepEqual(logs, ['input required', 0]),
//   },
//   jumpTestForOpcode6ShouldOutput0WhenInputIs0: {
//     ints: '3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9'.split(','),
//     input: '0',
//     assertion: () => require('assert').deepEqual(logs, ['input required', 0]),
//   },
//   jumpTestForOpcode6ShouldOutput1WhenInputIs1: {
//     ints: '3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9'.split(','),
//     input: '1',
//     assertion: () => require('assert').deepEqual(logs, ['input required', 1]),
//   },
//   jumpTestForOpcode5ShouldOutput0WhenInputIs0: {
//     ints: '3,3,1105,-1,9,1101,0,0,12,4,12,99,1'.split(','),
//     input: '0',
//     assertion: () => require('assert').deepEqual(logs, ['input required', 0]),
//   },
//   jumpTestForOpcode5ShouldOutput1WhenInputIs1: {
//     ints: '3,3,1105,-1,9,1101,0,0,12,4,12,99,1'.split(','),
//     input: '1',
//     assertion: () => require('assert').deepEqual(logs, ['input required', 1]),
//   },
// };

// let [_, __, ...args] = process.argv;
// if (!args.length) args = Object.keys(testDict);
// args.forEach(arg => {
//   const { ints, input, assertion } = testDict[arg];
  
//   processIntCode({
//     log: item => logs.push(item),
//     stdin: {
//       removeListener: () => {},
//       pause: () => {},
//       resume: () => {},
//       on: (_, cb) => cb(input),
//     },
//     ints,
//   });
//   assertion();
//   logs.length = 0;
// });
