// part 1: answer 1 to prompt
// part 2: answer 5 to prompt
const processIntCode = require('../intcode-computer');

processIntCode({
  ints: require('fs').readFileSync(__dirname + '/input', 'utf8').split(','),
});

// Uncomment below code to run tests
// const logs = [];
// const testDict = {
//   1: {
//     ints: require('fs').readFileSync(__dirname + '/input', 'utf8').split(','),
//     input: '1',
//     assertion: () => require('assert').deepEqual(logs, ['input required', 0, 0, 0, 0, 0, 0, 0, 0, 0, 13978427]),
//   },
//   2: {
//     ints: require('fs').readFileSync(__dirname + '/input', 'utf8').split(','),
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
