const codes = require("../data/codes");
const evalEntrypoint = require("./evalEntrypoint");

let buildRequestObj = (routes) => {
  // object to send to MapQuest
  let prod = {};
  let cc = {};
  for (tech in routes) {
    // all routes start at address of warehouse
    let starterEntrypoint = [
      "1918",
      "Babcock Blvd",
      "Pittsburgh",
      "PA",
      "15209",
    ];
    let prodEntrypoints = [starterEntrypoint];
    let ccEntrypoints = [starterEntrypoint];

    routes[tech].forEach((workOrder) => {
      let currentAddress = workOrder[0];
      // !codes.includes(workOrder[2][2])
      if (!codes.includes(workOrder[2][2])) {
        evalEntrypoint(prodEntrypoints, currentAddress);
      } else {
        evalEntrypoint(ccEntrypoints, currentAddress);
      }
    });
    prod[tech] = prodEntrypoints.map((address) => address.join(" "));
    cc[tech] = ccEntrypoints.map((address) => address.join(" "));
  }
  return { prod, cc };
};

module.exports = buildRequestObj;

/* .map((street) =>
            street.filter((account) => !codes.includes(account[2][2]))
          )
          .filter((x) => x.length > 0) */
