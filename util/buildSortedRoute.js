let doASort = (arr) => {
  let unsorted = true;
  let temp;
  while (unsorted) {
    unsorted = false;

    for (i = 0; i < arr.length - 1; ++i) {
      let num1 = Number(arr[i][0][0].split(" 1/2")[0]);
      let num2 = Number(arr[i + 1][0][0].split(" 1/2")[0]);
      if (num1 > num2) {
        temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        unsorted = true;
      }
    }
  }

  return arr;
};

let buildSortedRoute = (indexArr, request, routes, tech) => {
  let finishedRoute = [];
  indexArr.forEach((index) => {
    let sortedAddress = request[tech][index];

    let sortedAddressAsArray = routes[tech].filter((address) => {
      return address[0].join(" ") == sortedAddress;
    });

    let matchedWorkOrders = routes[tech].filter((workOrder) => {
      if (sortedAddressAsArray && sortedAddressAsArray[0]) {
        return sortedAddressAsArray[0][0][1] == workOrder[0][1];
      } else {
        return false;
      }
    });

    finishedRoute.push(doASort(matchedWorkOrders));
  });

  return finishedRoute;
};

module.exports = buildSortedRoute;
