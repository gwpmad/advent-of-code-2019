const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input', 'utf8');

function countOrbits (orbits) {
  const orbitsGraph = getOrbitsGraph(orbits.split('\n'));
  let count = 0;
  const queue = [{ entity: 'COM', depth: 1 }];
  
  while (queue.length) {
    const { entity, depth } = queue.shift();
    const orbiters = orbitsGraph.get(entity);
    if (!orbiters) continue;

    count += (orbiters.size * depth);
    orbiters.forEach(orbiter => queue.push({ entity: orbiter, depth: depth + 1 }));
  }
  return count;
}

function getOrbitsGraph(orbits) {
  return orbits.reduce((map, orbit) => {
    const [orbited, orbiter] = orbit.split(')');

    let orbitedsOrbiters = map.get(orbited);
    if (!orbitedsOrbiters) {
      orbitedsOrbiters = map.set(orbited, new Set()).get(orbited);
    }

    orbitedsOrbiters.add(orbiter);
    return map;
  }, new Map());
}


console.log(countOrbits(input));
