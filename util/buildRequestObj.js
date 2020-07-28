let buildRequestObj = routes => {
  // object to send to MapQuest
  let request = {};
  for (tech in routes) {
    // init the lastStreet var
    let lastStreet = null;
    // all routes start at address of warehouse
    request[tech] = ["1918 Babcock Blvd, Pittsburgh, PA 15209"];
    routes[tech].forEach(workOrder => {
      let currentStreet = workOrder[0][1];
      if (currentStreet != lastStreet) {
        request[tech].push(workOrder[0].join(" "));
        lastStreet = currentStreet;
      }
    });
  }
  /* console.log(request); */
  return request;
};

module.exports = buildRequestObj;
