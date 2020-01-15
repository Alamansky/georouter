const fetch = require("node-fetch");
//const config = require("../config");

let postJSONToEndpoint = async (endpoint, body) => {
  let res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  return await res.json();
};

module.exports = postJSONToEndpoint;
