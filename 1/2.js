const fs = require('fs');

const modules = fs.readFileSync(__dirname + '/input', 'utf8');

function sumFuelRequirements(input) {
  const splitModules = input.split('\n');
  return splitModules.reduce((sum, module) => sum + calculateFuelForModule(module), 0);
}


function calculateFuelForModule(module) {
  let totalFuel = 0;
  let counter = Number(module);

  while (true) {
    counter = Math.floor(counter / 3) - 2;
    if (counter <= 0) break;
    totalFuel += counter;
  }
  return totalFuel;
}

console.log(sumFuelRequirements(modules));
