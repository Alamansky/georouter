const doc = require("../html-builders/doc");
const style = require("../html-builders/style");
const getDate = require("./getDate");
const { createPDF } = require("html-to-pdf-studio");

let printRouteSheet = (sortedRoute, tech) => {
  let formattedText = sortedRoute
    .map(street =>
      street
        .map(
          workOrder =>
            `<tr><td>${workOrder[0].join(" ")}</td>\t<td>${
              workOrder[1][0]
            }</td><td>${workOrder[1][1]}</td><td>${
              workOrder[1][2].split("   ")[1]
            }</td><tr>\n`
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

  const pdfOptions = {
    format: "A4",
    headerTemplate: "<p></p>",
    footerTemplate: "<p></p>",
    displayHeaderFooter: false,
    margin: {
      top: "40px",
      bottom: "100px",
      left: "40px",
      right: "40px"
    },
    printBackground: true,
    path: `./routes/${tech}--${date}.pdf`
  };

  (async () => {
    await createPDF(
      doc(`<h3>${tech}\t:\t${date}</h3>${tableString}`, style),
      pdfOptions
    );
  })();
};

module.exports = printRouteSheet;
