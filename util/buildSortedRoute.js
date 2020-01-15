let buildSortedRoute = (indexArr, request, routes, tech) => {
  let finishedRoute = [];

  indexArr.forEach(index => {
    let sortedAddress = request[tech][index];
    let matchedWorkOrder = routes[tech].filter(workOrder =>
      sortedAddress.includes(workOrder[0][1])
    );
    finishedRoute.push(matchedWorkOrder);
  });

  return finishedRoute;
};

module.exports = buildSortedRoute;
