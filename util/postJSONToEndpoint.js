const fetch = require("node-fetch");

let postJSONToEndpoint = async (endpoint, body) => {
  let res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (res) {
    return await res.json();
  }
};

module.exports = postJSONToEndpoint;
