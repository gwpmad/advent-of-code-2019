const UP = 'U', DOWN = 'D', LEFT = 'L', RIGHT = 'R';

class WireJourney {
  constructor(input) {
    this.instructions = input.split(',');
    this.coordinates = [0, 0];
    this.locations = [];
  }

  makeJourney() {
    this.instructions.forEach((instruction) => {
      const direction = instruction[0];
      const steps = Number(instruction.slice(1));
      const moveFn = this[`_${direction}`].bind(this);
      this._moveSteps(moveFn, steps);
    });
  }

  getClosestCommonDistance(otherJourney) {
    const commonLocations = this._getCommonLocationDistances(otherJourney);
    return this._sortLocationsByDistanceFromOrigin(commonLocations)[0].distanceFromOrigin;
  }

  _getCommonLocationDistances(otherJourney) {
    const otherJourneyCoordinates = new Map(
      otherJourney.locations.map(({ coordinates, stepsTravelled }) => [coordinates, stepsTravelled])
    );
    return this.locations.reduce((acc, { distanceFromOrigin, coordinates, stepsTravelled }) => {
      if (!otherJourneyCoordinates.has(coordinates)) return acc;
      acc.push({
        distanceFromOrigin,
        combinedStepsTravelled: stepsTravelled + otherJourneyCoordinates.get(coordinates),
      });
      return acc;
    }, []);
  }

  _sortLocationsByDistanceFromOrigin(locations) {
    return locations.sort((a, b) => a.distance - b.distance);
  }

  _sortLocationsByCombinedStepsTravelled(locations) {
    return locations.sort((a, b) => a.combinedStepsTravelled - b.combinedStepsTravelled);
  }

  getFewestCombinedStepsForIntersection(otherJourney) {
    const commonLocations = this._getCommonLocationDistances(otherJourney);
    return this._sortLocationsByCombinedStepsTravelled(commonLocations)[0].combinedStepsTravelled;
  }

  _moveSteps(moveFn, steps) {
    for (let i = 1; i <= steps; i++) {
      moveFn();
      this._recordLocation();
    }
  }

  _recordLocation() {
    this.locations.push({
      coordinates: this.coordinates.join(','),
      distanceFromOrigin: Math.abs(this.coordinates[0]) + Math.abs(this.coordinates[1]),
      stepsTravelled: this.locations.length + 1,
    });
  }

  [`_${UP}`]() {
    this.coordinates[1] += 1;
  }

  [`_${DOWN}`]() {
    this.coordinates[1] -= 1;
  }

  [`_${LEFT}`]() {
    this.coordinates[0] -= 1;
  }

  [`_${RIGHT}`]() {
    this.coordinates[0] += 1;
  }
}

module.exports = WireJourney;
