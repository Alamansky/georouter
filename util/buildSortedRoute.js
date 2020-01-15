let buildSortedRoute = (indexArr, request, routes, tech) => {
  let finishedRoute = [];

  indexArr.forEach(index => {
    let sortedAddress = request[tech][index];
    let matchedAddress = routes[tech].filter(routeAddress =>
      sortedAddress.includes(routeAddress[1])
    );
    finishedRoute.push(matchedAddress);
  });

  return finishedRoute;
};

module.exports = buildSortedRoute;
