let buildRequestObj = routes => {
  let request = {};
  for (tech in routes) {
    let lastStreet = routes[tech][0][0];
    request[tech] = [];
    routes[tech].forEach(address => {
      let currentStreet = address[1];
      if (currentStreet != lastStreet) {
        request[tech].push(address.join(" "));
        lastStreet = currentStreet;
      }
    });
  }
  return request;
};

module.exports = buildRequestObj;
