const postJSONToEndpoint = require("./postJSONToEndpoint");
const args = require("../data/args")();
const config = require("../config");

const orderedRoute = async (prodOrderedRoutes, ccOrderedRoutes) => {
  for (tech in prodOrderedRoutes) {
    let payload = [prodOrderedRoutes[tech], ccOrderedRoutes[tech]];
    let message = await postJSONToEndpoint(
      args.LOCAL ? config.DEV_SERVER : config.ROBOROUTER_SERVER,
      {
        [tech.toLowerCase()]: payload,
      }
    );
    console.log(message);
    console.log(`${tech} succesfully routed.`);
  }
};
module.exports = orderedRoute;
