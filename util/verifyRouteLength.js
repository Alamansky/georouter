function calculateRouteLength(route) {
  return route.reduce((acc, val) => (acc += val.length), 0);
}

const verifyRouteLength = (routes, prodOrderedRoutes, ccOrderedRoutes) => {
  for (tech in routes) {
    if (
      calculateRouteLength([routes[tech]]) ==
      calculateRouteLength(prodOrderedRoutes[tech]) +
        calculateRouteLength(ccOrderedRoutes[tech])
    ) {
      console.log(`route for ${tech} verified`);
    } else {
      console.log("\x1b[31m", `ERROR: route length discrepency for ${tech}`);
    }
  }
};

module.exports = verifyRouteLength;
