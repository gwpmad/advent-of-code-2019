const processIntCode = require('../intcode-computer');

const ints = require('fs').readFileSync(__dirname + '/input', 'utf8').split(',');
ints[1] = 12;
ints[2] = 2;

// Real code
processIntCode({ ints });
console.log(ints[0]);

// Test code
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
// require('assert').equal(ints[0], 7594646);
 