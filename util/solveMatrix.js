let solveMatrix = (matrix) => {
  let indexArr = [];
  let currentIndex = 0;

  for (let i = 0; i < matrix.length; ++i) {
    let shortestDistance = 1000;
    let shortestDistanceIndex = null;
    matrix[currentIndex].forEach((distance, index) => {
      if (distance !== 0 && distance < shortestDistance) {
        shortestDistance = distance;
        shortestDistanceIndex = index;
      }
    });
    indexArr.push(shortestDistanceIndex);
    currentIndex = shortestDistanceIndex;
    matrix.forEach((subArr) => {
      subArr[currentIndex] = 0;
    });
  }

  return indexArr.filter((index) => index != null);
};

module.exports = solveMatrix;
