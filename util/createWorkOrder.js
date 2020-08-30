const CSV_cols = require("../data/CSV_cols");
const formatStreet = require("./formatStreet");

const createWorkOrder = (row) => {
  let streetNameFormatted = formatStreet(row[CSV_cols.STREET_NAME]);
  let workOrder = [
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
  ];
  return workOrder;
};

module.exports = createWorkOrder;
