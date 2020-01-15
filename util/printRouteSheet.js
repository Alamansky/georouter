const fs = require("fs");
const doc = require("../html-builders/doc");
const style = require("../html-builders/style");
const getDate = require("./getDate");

let printRouteSheet = (sortedRoute, tech) => {
  let formattedText = sortedRoute
    .map(street =>
      street
        .map(
          workOrder =>
            `<tr><td>${workOrder[0].join(" ")}</td>\t<td>${
              workOrder[1][0]
            }</td><td>${workOrder[1][1]}</td><td>${workOrder[1][2]}</td><tr>\n`
        )
        .join("\n")
    )
    .join("\n");
  let tableString = `<table>
      <thead>
        <tr>
            <th>Address</th>
            <th>Meter Number</th>
            <th>Meter Location</th>
            <th>Meter Information</th>
        </tr>
      </thead>
      <tbody>${formattedText}</tbody>
    </table>`;
  let date = getDate();
  fs.writeFile(
    `./routes/${tech}--${date}.html`,
    doc(`<h3>${tech} - ${date}</h3>${tableString}`, style),
    "utf-8",
    err => {
      if (err) throw err;
    }
  );
};

module.exports = printRouteSheet;
