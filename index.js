const fs = require("fs");
const parse = require("csv-parse");
const path = require("path");
const config = require("./config");
const buildRouteObj = require("./util/buildRouteObj");
const buildRequestObj = require("./util/buildRequestObj");
const postJSONToEndpoint = require("./util/postJSONToEndpoint");
const mockPostJSONToEndpoint = require("./testing/mockPostJSONToEndpoint");
const solveMatrix = require("./util/solveMatrix");
const buildSortedRoute = require("./util/buildSortedRoute");
const printRouteSheet = require("./util/printRouteSheet");
const generateShortIndexArr = require("./util/generateShortIndexArr");

// program arg constants
let DEV = false;
let LOCAL = false;
let PDF = false;
let FILE_NAME = "zmccants.csv";

// get program args
process.argv.forEach((arg, index) => {
  if (index >= 2) {
    switch (true) {
      case /--devMode/.test(arg):
        DEV = true;
        break;
      case /--local/.test(arg):
        LOCAL = true;
        break;
      case /--pdf/.test(arg):
        PDF = true;
        break;
      case Boolean(arg.match(/file/)):
        FILE_NAME = arg.split("=")[1];
        break;
    }
  }
});

// csv structure of input
const CSV_cols = {
  FSR: 0,
  APTS: 1,
  STREET_NUM: 2,
  STREET_NAME: 3,
  CITY: 4,
  STATE: 5,
  ZIP: 6,
  SERIAL: 7,
  LOCATION: 8,
  MANUFACTURER: 9,
  LAST_VISIT_DATE: 10,
  LAST_VISIT_FSR: 11,
  LAST_VISIT_REASON: 12,
  LAST_VISIT_COMMENT: 13,
  DISPATCHED_DATE: 14,
};

// read input file
fs.readFile(path.join(__dirname, FILE_NAME), "utf-8", (err, data) => {
  if (err) throw err;
  parse(
    data,
    {
      relax_column_count: true,
      from_line: 2,
    },
    async function (err, output) {
      if (err) {
        console.log(err);
      }
      // build an object where key is tech fsr and value is an array of work orders (route)
      let routes = buildRouteObj(output, CSV_cols);
      // take first address from each street in route
      let request = buildRequestObj(routes);
      for (tech in request) {
        console.log(`building route for ${tech}`);
        let reqBody = {
          locations:
            request[tech].length > 25
              ? request[tech].slice(0, 25)
              : request[tech],
          options: {
            allToAll: true,
          },
        };
        let data = null;
        if (request[tech].length > 2) {
          data = await postJSONToEndpoint(
            `${config.MAPQUEST_API_ENDPOINT}${
              DEV ? config.MAPQUEST_API_DEV : config.MAPQUEST_API_PROD
            }`,
            reqBody
          );
        } else {
          data = generateShortIndexArr(request[tech].length);
        }
        let indexArr = solveMatrix(data.distance);
        indexArr = indexArr.filter((index) => index != null);
        let sortedRoute = buildSortedRoute(indexArr, request, routes, tech);
        let x = await postJSONToEndpoint(
          LOCAL ? config.DEV_SERVER : config.ROBOROUTER_SERVER,
          {
            [tech.toLowerCase()]: sortedRoute,
          }
        );
        console.log(x);
        console.log(`${tech} succesfully routed.`);
        PDF && printRouteSheet(sortedRoute, tech);
      }
    }
  );
});
