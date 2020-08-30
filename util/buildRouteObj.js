const createWorkOrder = require("./createWorkOrder");

let buildRouteObj = (parsedCSV, CSV_cols) => {
  let routes = {};
  parsedCSV.forEach((row) => {
    if (!row[CSV_cols.APTS]) {
      let technician = row[CSV_cols.FSR];
      let workOrder = createWorkOrder(row);
      routes[technician]
        ? routes[technician].push(workOrder)
        : (routes[technician] = Array.of(workOrder));
    }
  });
  return routes;
};

module.exports = buildRouteObj;
