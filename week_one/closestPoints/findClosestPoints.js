;(function(){
  var mergeSortByXorY = require('./mergeSortByXorY.js');

  function findClosestPoints(points){

    // preprocess by sorting all points by x
    var pointsSortedByX = mergeSortByXorY(points, 'x');
    // preprocess by sorting all points by y
    var pointsSortedByY = mergeSortByXorY(points, 'y');

    // begin divide part of divide and conquer for calculating distances
    function divideOnXAndMerge(pointsByX, pointsByY){
      // initialize variables
      var distanceA, distanceB, distanceC, closestDistance, closestPoints,
          centerIndex, leftHalfByX, rightHalfByX, leftHalfByY, rightHalfByY,
          processedLeftHalf, processedRightHalf;

      // if array only contains two or three points
      if( pointsByX.length <= 3 ){
        // calculate the shortest point and return
        if( pointsByX.length === 3){

          distanceA = calculateDistance(pointsByX[0], pointsByX[1]);
          distanceB = calculateDistance(pointsByX[0], pointsByX[2]);
          distanceC = calculateDistance(pointsByX[1], pointsByX[2]);
          closestDistance = Math.min(distanceA, distanceB, distanceC);

          if( closestDistance === distanceA ) closestPoints = [pointsByX[0], pointsByX[1]];
          if( closestDistance === distanceB ) closestPoints = [pointsByX[0], pointsByX[2]];
          if( closestDistance === distanceC ) closestPoints = [pointsByX[1], pointsByX[2]];

          return {
            closestDistance: closestDistance,
            closestPoints: closestPoints,
            pointsByX: pointsByX,
            pointsByY: pointsByY
          };

        }else{
          return {
            closestDistance: calculateDistance(pointsByX[0], pointsByX[1]),
            closestPoints: [pointsByX[0], pointsByX[1]],
            pointsByX: pointsByX,
            pointsByY: pointsByY
          };
        }
      }

      // recursively split on x until down to base case where we have only 2 points
      // to calculate the distance between
      centerIndex = Math.ceil(pointsByX.length / 2);
      leftHalfByX = pointsByX.slice(0, centerIndex);
      rightHalfByX = pointsByX.slice(centerIndex);

      leftHalfByY = spliceAppropriateYs(leftHalfByX, pointsByY);
      rightHalfByY = spliceAppropriateYs(rightHalfByX, pointsByY);

      processedLeftHalf = divideOnXAndMerge(leftHalfByX, leftHalfByY);
      processedRightHalf = divideOnXAndMerge(rightHalfByX, rightHalfByY);

      return merge(processedLeftHalf, processedRightHalf);

    }
  }

  function merge(leftHalf, rightHalf){
    // initiate variables
    var closestInOneHalf, closestBetweenHalves;

    var results = {
      closestDistance: undefined,
      closestPoints: undefined
    };

    // calculate closest distance and points already discovered in left and right halves
    closestInOneHalf = Math.min(leftHalfByX.closestDistance, rightHalfByX.closestDistance);
    closestBetweenHalves = calculateClosestBetweenHalves(leftHalfByX, rightHalfByX, leftHalfByY, rightHalfByY);


    return results;
  }

  function calculateClosestBetweenHalves(leftHalfByX, rightHalfByX, leftHalfByY, rightHalfByY){

  }

  function spliceAppropriateYs(xPoints, yPoints){
    var appropriateYs;
    var xs = {};

    xPoints.forEach(point, storePointInHash);
    return yPoints.reduce(isYPointInXHash, []);

    function storePointInHash(point){
      xs[point] = true;
    }

    function isYPointInXHash(yPoint){
      return xs.hasOwnProperty(yPoint);
    }
  }

  function calculateDistance(pointOne, pointTwo){
    var distanceBetweenX = pointOne[0] - pointTwo[0];
    var distanceBetweenY = pointOne[1] - pointTwo[1];
    return Math.sqrt(Math.pow(distanceBetweenX, 2) + Math.pow(distanceBetweenY, 2));
  }

  module.exports = findClosestPoints;
})();