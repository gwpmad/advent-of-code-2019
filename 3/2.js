const fs = require('fs');
const WireJourney = require('./WireJourney');

const wires = fs.readFileSync(__dirname + '/input', 'utf8');
const [wire1, wire2] = wires.split('\n');

const journey1 = new WireJourney(wire1);
journey1.makeJourney();

const journey2 = new WireJourney(wire2);
journey2.makeJourney();

console.log(journey1.getFewestCombinedStepsForIntersection(journey2));
