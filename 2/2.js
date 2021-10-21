const processIntCode = require('../intcode-computer');

const originalInts = require('fs').readFileSync(__dirname + '/input', 'utf8').split(',');
const getFreshInts = () => [...originalInts];
const DESIRED_OUTPUT = '19690720';

// Real code
for (let noun = 0; noun <= 99; noun++) {
  for (let verb = 0; verb <= 99; verb++) {
    const ints = getFreshInts();
    ints[1] = noun;
    ints[2] = verb;

    processIntCode({ ints });
    if (ints[0] === DESIRED_OUTPUT) {
      console.log(doNounAndVerbArithmetic(noun, verb));
      break;
    }
  }
}

// Test code
// const ints = getFreshInts();
// ints[1] = 33;
// ints[2] = 76;
// processIntCode({
//   log: () => {},
//   stdin: {
//     removeListener: () => {},
//     pause: () => {},
//     resume: () => {},
//     on: (_, cb) => cb(input),
//   },
//   ints,
// });
// require('assert').equal(ints[0], DESIRED_OUTPUT);
