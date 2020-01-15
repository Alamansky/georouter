/* for (tech in routes) {
    routes[tech].sort(function(a, b) {
      var nameA = a[1].length > 1 ? a[1].toUpperCase() : a[2].toUpperCase(); // ignore upper and lowercase
      var nameB = b[1].length > 1 ? b[1].toUpperCase() : b[2].toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  } */

/*   let xxx = [];
      let indexes = [];
      data.distance.forEach(distances => {
        let shortestDistance = 1000;
        let shortestDistanceIndex = null;
        distances.forEach((distance, index) => {
          if (distance !== 0 && distance < shortestDistance) {
            shortestDistance = distance;
            shortestDistanceIndex = index;
          }
        });
        xxx.push(shortestDistance);
        indexes.push(shortestDistanceIndex);
      });
      console.log(indexes);

      let finalAnswer = [];

      indexes.forEach(index => {
        let nextAddress = request.aamiller[index];
        let aaa = routes.aamiller.filter(routeAddress =>
          request.aamiller[index].includes(routeAddress[1])
        );
        finalAnswer.push(aaa);
      });

      console.log(finalAnswer); */
