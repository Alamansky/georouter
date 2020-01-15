let getDate = () => {
  return `${new Date().getMonth() +
    1}-${new Date().getDate()}-${new Date().getFullYear()}`;
};

module.exports = getDate;
