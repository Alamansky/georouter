const fs = require("fs");
const parse = require("csv-parse");
const path = require("path");
const config = require("./config");
const processSpreadsheet = require("./util/processSpreadsheet");
const args = require("./data/args")();

// read input file
fs.readFile(path.join(__dirname, args.FILE_NAME), "utf-8", (err, data) => {
  if (err) throw err;
  parse(
    data,
    {
      relax_column_count: true,
      from_line: 2,
    },
    (err, output) => processSpreadsheet(err, output)
  );
});
