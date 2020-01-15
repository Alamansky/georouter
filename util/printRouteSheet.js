const fs = require("fs");

let printRouteSheet = (sortedRoute, tech) => {
  let formattedText = sortedRoute
    .map(street => street.map(address => `${address.join(" ")}\n`).join("\n"))
    .join("\n");
  fs.writeFile(
    `./routes/${tech}--${new Date().getMonth() +
      1}-${new Date().getDate()}-${new Date().getFullYear()}.txt`,
    formattedText,
    "utf-8",
    err => {
      if (err) throw err;
    }
  );
};

module.exports = printRouteSheet;
