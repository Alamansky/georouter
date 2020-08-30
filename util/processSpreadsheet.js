const buildRouteObj = require("./buildRouteObj");
const buildRequestObj = require("./buildRequestObj");
const hitMapQuestAPI = require("./hitMapQuestAPI");
const buildOrderedRoute = require("./buildOrderedRoute");
const updateServer = require("./updateServer");
const CSV_cols = require("../data/CSV_cols");
const verifyRouteLength = require("./verifyRouteLength");

module.exports = async function (err, output) {
  if (err) {
    console.log(err);
  }
  // build an object where key is tech fsr and value is an array of work orders (route)
  let routes = buildRouteObj(output, CSV_cols);

  // take entrypoint from each street in route
  let { prod, cc } = buildRequestObj(routes);

  // hit MapQuest API
  let prodMatrix = await hitMapQuestAPI(prod);
  let ccMatrix = await hitMapQuestAPI(cc);

  // build ordered route
  let prodOrderedRoutes = buildOrderedRoute(prod, routes, prodMatrix);
  let ccOrderedRoutes = buildOrderedRoute(cc, routes, ccMatrix);

  // verify route length
  verifyRouteLength(routes, prodOrderedRoutes, ccOrderedRoutes);

  // update the server
  updateServer(prodOrderedRoutes, ccOrderedRoutes);
};
