const config = require("../config");
const generateShortIndexArr = require("./generateShortIndexArr");
const postJSONToEndpoint = require("./postJSONToEndpoint");
const args = require("../data/args")();

const hitMapQuestAPI = async (prod) => {
  let matrix = {};
  for (tech in prod) {
    console.log(`building request for ${tech}`);
    let reqBody = {
      locations: prod[tech].length > 25 ? prod[tech].slice(0, 25) : prod[tech],
      options: {
        allToAll: true,
      },
    };
    let data = null;
    if (prod[tech].length > 2) {
      data = await postJSONToEndpoint(
        `${config.MAPQUEST_API_ENDPOINT}${
          args.DEV ? config.MAPQUEST_API_DEV : config.MAPQUEST_API_PROD
        }`,
        reqBody
      );
    } else {
      data = generateShortIndexArr(prod[tech].length);
    }
    matrix[tech] = data;
  }
  return matrix;
};

module.exports = hitMapQuestAPI;
