const input = '206938-679128';

const numbers = input.split('-').map(Number);

let result = 0;

loop1:
for (let i = numbers[0]; i <= numbers[1]; i++) {
  const digitArray = i.toString().split('').map(Number);

  let repeatedDigit = false;
  for (let j = 1; j < digitArray.length; j++) {
    const previous = digitArray[j-1], current = digitArray[j];
    if (previous === 0 || current === 0 || current < previous) continue loop1;
    if (previous === current) repeatedDigit = true;
  }
  if (repeatedDigit) result += 1;
}

console.log(result);
