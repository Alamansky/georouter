const solveMatrix = require("./solveMatrix");
const buildSortedRoute = require("./buildSortedRoute");

const buildOrderedRoute = (entrypoints, routes, matrix) => {
  const payloadToServer = {};
  for (tech in matrix) {
    if (entrypoints[tech].length > 1) {
      let indexArr = solveMatrix(matrix[tech].distance);
      let sortedRoute = buildSortedRoute(indexArr, entrypoints, routes, tech);
      payloadToServer[tech] = sortedRoute;
    } else {
      payloadToServer[tech] = [];
    }
  }
  return payloadToServer;
};

module.exports = buildOrderedRoute;
