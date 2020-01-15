let formatStreet = streetName => {
  return streetName
    .split("Fl")[0]
    .split("-")[0]
    .split("Apt")[0]
    .split("Rear")[0]
    .split("Hse")[0]
    .trim();
};

module.exports = formatStreet;
