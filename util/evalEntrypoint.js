module.exports = function evalEntrypoint(prodEntrypoints, currentAddress) {
  let newStreet = true;
  prodEntrypoints.forEach((entry, index) => {
    // if address is on same street as existing entrypoint, keep the element with a lower street number
    if (entry[1] == currentAddress[1]) {
      if (entry[0] > currentAddress[0]) {
        prodEntrypoints[index] = currentAddress;
      }
      // if address is on same street as existing entrypoint, toggle newStreet bool to false
      newStreet = false;
    }
  });
  // if address is on new street, add to entrypoint array
  newStreet && prodEntrypoints.push(currentAddress);
};
