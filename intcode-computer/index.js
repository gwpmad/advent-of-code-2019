function processIntCode(_options = {}) {
  const options = getOptions(_options);
  const opcodeDict = getOpcodeDictionary(options);
  const { index, ints } = options;
  
  for (let i = index; i < ints.length;) {
    const value = ints[i];
    if (value === '99') return;
    const { modes, opcode } = parseOpcodeValue(value);
    const { handler, paramsMetadata } = opcodeDict[opcode];
    const params = getParams(paramsMetadata, ints, i, modes);
    const { pointerLocation = i + paramsMetadata.paramsLength + 1, pauseForInput } = handler(params, i);
  
    if (pauseForInput) return;
    i = pointerLocation;
  }
}

function getOpcodeDictionary({
  ints,
  log,
  stdin
}) {
  const defaultResult = { pointerLocation: undefined, pauseForInput: false };
  return {
    1: {
      handler: (params) => {
        ints[params[2]] = String(Number(params[0]) + Number(params[1]));
        return defaultResult;
      },
      paramsMetadata: {
        paramsLength: 3,
        finalParamIsLocation: true
      }
    },
    2: {
      handler: (params) => {
        ints[params[2]] = String(Number(params[0]) * Number(params[1]));
        return defaultResult;
      },
      paramsMetadata: {
        paramsLength: 3,
        finalParamIsLocation: true
      }
    },
    3: {
      handler: (params, currentIdx) => {
        log('input required')
        const callback = (data) => {
          stdin.removeListener('data', callback);
          stdin.pause();
          const param = Number(params[0]);
          ints[param] = data.toString();
          processIntCode({ index: currentIdx + 2, ints, stdin, log });
        };
        stdin.resume();
        stdin.on('data', callback);
        return { pauseForInput: true }
      },
      paramsMetadata: {
        paramsLength: 1,
        finalParamIsLocation: true
      }
    },
    4: {
      handler: (params) => {
        log(params[0]);
        return defaultResult;
      },
      paramsMetadata: {
        paramsLength: 1,
        finalParamIsLocation: false,
      }
    },
    5: {
      handler: (params) => {
        return params[0] !== '0' ? { pointerLocation: Number(params[1]) } : defaultResult;
      },
      paramsMetadata: {
        paramsLength: 2,
        finalParamIsLocation: false,
      }
    },
    6: {
      handler: (params) => {
        return params[0] === '0' ? { pointerLocation: Number(params[1]) }: defaultResult;
      },
      paramsMetadata: {
        paramsLength: 2,
        finalParamIsLocation: false,
      }
    },
    7: {
      handler: (params) => {
        const output = Number(params[0]) < Number(params[1]) ? '1' : '0';
        ints[params[2]] = output;
        return defaultResult;
      },
      paramsMetadata: {
        paramsLength: 3,
        finalParamIsLocation: true
      }
    },
    8: {
      handler: (params) => {
        const output = params[0] === params[1] ? '1' : '0';
        ints[params[2]] = output;
        return defaultResult;
      },
      paramsMetadata: {
        paramsLength: 3,
        finalParamIsLocation: true
      }
    },
  };
}

function getParams(paramsMetadata, ints, currentIdx, modes) {
  const { paramsLength, finalParamIsLocation } = paramsMetadata;
  const params = [];
  for (let i = 0; i < paramsLength; i++) {
    const initialParam = ints[currentIdx + i + 1];
    if (finalParamIsLocation && i === (paramsLength - 1)) {
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
    ints: ints || [],
    index: index || 0,
    stdin: stdin || process.stdin,
    log: log || console.log.bind(console),
  }
}

module.exports = processIntCode;
