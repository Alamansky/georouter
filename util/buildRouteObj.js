const formatStreet = require("./formatStreet");

let buildRouteObj = (parsedCSV, CSV_cols) => {
  let routes = {};
  parsedCSV.forEach(row => {
    if (!row[CSV_cols.APTS]) {
      let technician = row[CSV_cols.FSR];
      let streetNameFormatted = formatStreet(row[CSV_cols.STREET_NAME]);
      if (!routes[technician]) {
        routes[technician] = Array.of([
          [
            row[CSV_cols.STREET_NUM],
            streetNameFormatted,
            row[CSV_cols.CITY],
            row[CSV_cols.STATE],
            row[CSV_cols.ZIP]
          ],
          [
            row[CSV_cols.SERIAL],
            row[CSV_cols.LOCATION],
            row[CSV_cols.MANUFACTURER]
          ]
        ]);
      } else {
        routes[technician].push([
          [
            row[CSV_cols.STREET_NUM],
            streetNameFormatted,
            row[CSV_cols.CITY],
            row[CSV_cols.STATE],
            row[CSV_cols.ZIP]
          ],
          [
            row[CSV_cols.SERIAL],
            row[CSV_cols.LOCATION],
            row[CSV_cols.MANUFACTURER]
          ]
        ]);
      }
    }
  });
  return routes;
};

module.exports = buildRouteObj;
