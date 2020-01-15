let buildRequestObj = routes => {
  let request = {};
  for (tech in routes) {
    let lastStreet = routes[tech][0][1];
    request[tech] = [];
    routes[tech].forEach(workOrder => {
      let currentStreet = workOrder[0][1];
      if (currentStreet != lastStreet) {
        request[tech].push(workOrder[0].join(" "));
        lastStreet = currentStreet;
      }
    });
  }
  return request;
};

module.exports = buildRequestObj;
