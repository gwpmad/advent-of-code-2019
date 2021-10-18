const fs = require('fs');

const modules = fs.readFileSync(__dirname + '/input', 'utf8');

function sumFuelRequirements(input) {
  const splitModules = input.split('\n');
  let totalFuelRequired = 0;
  for (const module of splitModules) {
    const fuelRequired = Math.floor(Number(module) / 3) - 2;
    totalFuelRequired += fuelRequired;
  }
  return totalFuelRequired;
}

console.log(sumFuelRequirements(modules));
