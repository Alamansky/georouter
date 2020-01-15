const fs = require("fs");
const parse = require("csv-parse");
const path = require("path");
const config = require("./config");
const fetch = require("node-fetch");
const formatStreet = require("./util/formatStreet");
const buildRouteObj = require("./util/buildRouteObj");
const buildRequestObj = require("./util/buildRequestObj");
const postJSONToEndpoint = require("./util/postJSONToEndpoint");
const solveMatrix = require("./util/solveMatrix");
const buildSortedRoute = require("./util/buildSortedRoute");
const printRouteSheet = require("./util/printRouteSheet");

const verbose = process.argv[2] == "-v" ? true : false;
const FILE_NAME = "routes.csv";

const FSR = 0;
const APTS = 1;
const STREET_NUM = 2;
const STREET_NAME = 3;
const CITY = 4;
const STATE = 5;
const ZIP = 6;
const ADDRESS = 7;

const CSV_cols = {
  FSR: 0,
  APTS: 1,
  STREET_NUM: 2,
  STREET_NAME: 3,
  CITY: 4,
  STATE: 5,
  ZIP: 6,
  ADDRESS: 7
};

//let request = {};

fs.readFile(path.join(__dirname, FILE_NAME), "utf-8", (err, data) => {
  if (err) throw err;
  parse(
    data,
    {
      relax_column_count: true,
      from_line: 2
    },
    async function(err, output) {
      if (err) {
        verbose && console.log(err);
      }
      let routes = buildRouteObj(output, CSV_cols);
      verbose && console.log(`extracting data from route sheets`);
      let request = buildRequestObj(routes);
      verbose && console.log(`preparing API request objects`);

      for (tech in request) {
        verbose && console.log(`requesting distance matrix for ${tech}...`);
        if (request[tech].length > 2) {
          let reqBody = {
            locations:
              request[tech].length > 25
                ? request[tech].slice(0, 25)
                : request[tech],
            options: {
              allToAll: true
            }
          };
          let data = await postJSONToEndpoint(
            `${config.MAPQUEST_API_ENDPOINT}${config.MAPQUEST_API_KEY}`,
            reqBody
          );
          verbose && console.log(`matrix received`);
          let indexArr = solveMatrix(data.distance);
          verbose && console.log(`calculating optimum route for ${tech}`);
          let sortedRoute = buildSortedRoute(indexArr, request, routes, tech);
          verbose && console.log(`${tech} succesfully routed`);

          printRouteSheet(sortedRoute, tech);
        }
      }
    }
  );
});
