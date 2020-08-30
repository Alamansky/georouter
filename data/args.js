// program arg constants

module.exports = getArgs = () => {
  const args = {
    DEV: true,
    LOCAL: true,
    PDF: false,
    FILE_NAME: "",
  };

  // get program args
  process.argv.forEach((arg, index) => {
    if (index >= 2) {
      switch (true) {
        case /--devMode/.test(arg):
          args.DEV = true;
          break;
        case /--local/.test(arg):
          args.LOCAL = true;
          break;
        case /--pdf/.test(arg):
          args.PDF = true;
          break;
        case Boolean(arg.match(/file/)):
          args.FILE_NAME = arg.split("=")[1];
          break;
      }
    }
  });

  return args;
};
