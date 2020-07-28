let formatStreet = streetName => {
  return streetName
    .split("Fl")[0]
    .split("-")[0]
    .split(",")[0]
    .split("Apt")[0]
	.split("Stapt")[0]
    .split("Rear")[0]
    .split("Front")[0]
    .split("Hse")[0]
    .split("Hs")[0]
    .split(".")[0]
    .split("#")[0]
    .split("1st Fl")[0]
    .split("2nd Fl")[0]
    .split("Frnt")[0]
    .split("(carriage House)")[0]
    .split("Carriage House")[0]
    .split("Unit")[0]
    .split("&")[0]
    .trim();
};

module.exports = formatStreet;
