const formatStreet = require("./formatStreet");

let buildRouteObj = (parsedCSV, CSV_cols) => {
  let routes = {};
  parsedCSV.forEach((row) => {
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
            row[CSV_cols.ZIP],
          ],
          [
            row[CSV_cols.SERIAL],
            row[CSV_cols.LOCATION],
            row[CSV_cols.MANUFACTURER],
            row[CSV_cols.DISPATCHED_DATE],
          ],
          [
            row[CSV_cols.LAST_VISIT_DATE],
            row[CSV_cols.LAST_VISIT_FSR],
            row[CSV_cols.LAST_VISIT_REASON],
            row[CSV_cols.LAST_VISIT_COMMENT],
          ],
        ]);
      } else {
        routes[technician].push([
          [
            row[CSV_cols.STREET_NUM],
            streetNameFormatted,
            row[CSV_cols.CITY],
            row[CSV_cols.STATE],
            row[CSV_cols.ZIP],
          ],
          [
            row[CSV_cols.SERIAL],
            row[CSV_cols.LOCATION],
            row[CSV_cols.MANUFACTURER],
            row[CSV_cols.DISPATCHED_DATE],
          ],
          [
            row[CSV_cols.LAST_VISIT_DATE],
            row[CSV_cols.LAST_VISIT_FSR],
            row[CSV_cols.LAST_VISIT_REASON],
            row[CSV_cols.LAST_VISIT_COMMENT],
          ],
        ]);
      }
    }
  });
  return routes;
};

module.exports = buildRouteObj;
