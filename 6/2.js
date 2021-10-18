const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input', 'utf8');

function findMinimumTransfersBetween (orbits, start, target) {
  const orbitsGraph = getOrbitsGraph(orbits.split('\n'));
  const transferCounts = [];
  const queue = Array.from(orbitsGraph.get(start))
    .map(entity => ({ previous: start, current: entity, transfers: 0 }));
  
  while (queue.length) {
    const { previous, current, transfers } = queue.shift();
    const entry = orbitsGraph.get(current);
    if (entry.has(target)) {
      transferCounts.push(transfers);
      continue;
    }
    entry.forEach(entity => {
      if (entity === previous) return;
      queue.push({ previous: current, current: entity, transfers: transfers + 1 })
    });
  }
  return Math.min(...transferCounts);
}

function getOrbitsGraph(orbits) {
  return orbits.reduce((map, orbit) => {
    const [orbited, orbiter] = orbit.split(')');

    const orbitedSet = ensureEntitySet(map, orbited);
    const orbiterSet = ensureEntitySet(map, orbiter);

    orbitedSet.add(orbiter);
    orbiterSet.add(orbited);

    return map;
  }, new Map());
}

function ensureEntitySet(map, entity) {
  let entry = map.get(entity);
  if (!entry) {
    entry = map.set(entity, new Set())
      .get(entity);
  }
  return entry;
}

console.log(findMinimumTransfersBetween(input, 'YOU', 'SAN'));
