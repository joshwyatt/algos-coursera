// This is an implementation of an algorithm to find the two closest points on a two dimension graph
// that runs in O(nlogn) time, based on an algorithms course taught by Tim Roughgarden by way of Coursera

;(function(){

  // This O(nlogn) implentation requires two sets of coordinates, one sorted by x and the other by y.
  // Here we use a slightly modified merge sort to sort by either x or y
  var mergeSortByXorY = require('./mergeSortByXorY.js');

  // This is the main function which will call all the others
  function findClosestPoints(points){
    // preprocess by sorting all points by x
    var pointsSortedByX = mergeSortByXorY(points, 'x');
    // preprocess by sorting all points by y
    var pointsSortedByY = mergeSortByXorY(points, 'y');

    // begin divide part of divide and conquer for calculating distances
    return divideOnXAndMerge(pointsSortedByX, pointsSortedByY);
  }
  // This is the main subroutine...the 'conquer' of the 'divide and conquer'
  function divideOnXAndMerge(pointsByX, pointsByY){
    // initialize variables
    var distanceA, distanceB, distanceC, closestDistance, closestPoints,
        centerIndex, leftHalfByX, rightHalfByX, leftHalfByY, rightHalfByY,
        processedLeftHalf, processedRightHalf;

    // if array only contains two or three points calculate the shortest point and return
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

    }
    if( pointsByX.length === 2 ){
      return {
        closestDistance: calculateDistance(pointsByX[0], pointsByX[1]),
        closestPoints: [pointsByX[0], pointsByX[1]],
        pointsByX: pointsByX,
        pointsByY: pointsByY
      };
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

  // This function returns the set of sorted y coordinates that are the same as the current set of
  // coordinates sorted by x
  function spliceAppropriateYs(xPoints, yPoints){
    var appropriateYs;
    var xs = {};

    xPoints.forEach(storePointInHash);
    return yPoints.filter(isYPointInXHash, []);

    function storePointInHash(point){
      xs[point] = true;
    }

    function isYPointInXHash(yPoint){
      return xs.hasOwnProperty(yPoint);
    }
  }

  // This function discovers whether or not there is a set of points split between the right and
  // left halves that are closer together that the closest points on the left half and the closest
  // points on the right half
  function merge(leftHalf, rightHalf){
    // initiate variables
    var closestInOneHalf, closestDistanceBetweenHalves, closestPoints, sortedPointsByY;

    var results = {
      closestDistance: undefined,
      closestPoints: undefined,
      pointsByX: undefined,
      pointsByY: undefined
    };

    // calculate closest distance and points already discovered in left and right halves
    if( leftHalf.closestDistance < rightHalf.closestDistance ){
      closestInOneHalf = leftHalf.closestDistance;
      closestPoints = leftHalf.closestPoints;
    }else{
      closestInOneHalf = rightHalf.closestDistance;
      closestPoints = rightHalf.closestPoints;
    }

    results.pointsByX = leftHalf.pointsByX.concat(rightHalf.pointsByX);
    sortedPointsByY = sortYPoints(leftHalf.pointsByY, rightHalf.pointsByY);
    results.pointsByY = sortedPointsByY;

    closestDistanceBetweenHalves = calculateClosestBetweenHalves(leftHalf, rightHalf, closestInOneHalf, closestPoints);


    if( closestDistanceBetweenHalves ){
      results.closestDistance = closestDistanceBetweenHalves.closestDistance;
      results.closestPoints = closestDistanceBetweenHalves.closestPoints;
    }else{
      results.closestDistance = closestInOneHalf;
      results.closestPoints = closestPoints;
    }

    return results;
  }

  // This is a helper function for `merge` that organizes the sets for potential discovery of points
  // split between the two sides that are closest
  function calculateClosestBetweenHalves(leftHalf, rightHalf, closestInOneHalf, closestPoints){
    var lastLeftIndex, verticalMiddle, xAxisMax, xAxisMin, leftYPoints, rightYPoints,
        leftPointsToEvaluate, rightPointsToEvaluate, pointsToEvaluate;

    lastLeftIndex = leftHalf.pointsByX.length - 1;
    verticalMiddle = leftHalf.pointsByX[lastLeftIndex][0];

    xAxisMax = verticalMiddle + closestInOneHalf;
    xAxisMin = verticalMiddle - closestInOneHalf;

    leftYPoints = leftHalf.pointsByY;
    rightYPoints = rightHalf.pointsByY;

    leftPointsToEvaluate = leftYPoints.filter(function(point){
      return isBetweenXMinAndXMax(point, xAxisMin, xAxisMax);
    }, []);

    rightPointsToEvaluate = rightYPoints.filter(function(point){
      return isBetweenXMinAndXMax(point, xAxisMin, xAxisMax);
    }, []);

    pointsToEvaluate = sortYPoints(leftPointsToEvaluate, rightPointsToEvaluate);

    closestDistanceBetweenHalves = iterateUpToSevenAway(pointsToEvaluate, closestInOneHalf);
    return closestDistanceBetweenHalves ? closestDistanceBetweenHalves: null;
  }

  // This helper function filters for only the points that are potentially closer than the already
  // closest calculation by setting a min and max x value and filtering for the points within them
  function isBetweenXMinAndXMax(point, xAxisMin, xAxisMax){
    var x = point[0];
    return x > xAxisMin && x < xAxisMax;
  }

  // This helper function calculates the distance between two points on a 2d graph
  function calculateDistance(pointOne, pointTwo){
    var distanceBetweenX = pointOne[0] - pointTwo[0];
    var distanceBetweenY = pointOne[1] - pointTwo[1];
    return Math.sqrt(Math.pow(distanceBetweenX, 2) + Math.pow(distanceBetweenY, 2));
  }

  // This function merges two point sets sorted by y coordinates into a single set sorted by y
  // coordinates
  function sortYPoints(leftYPoints, rightYPoints){
    var sideWithLeftovers;
    var leftIndex = 0;
    var rightIndex = 0;
    var results = [];

    while( leftIndex < leftYPoints.length && rightIndex < rightYPoints.length ){
      if( leftYPoints[leftIndex][1] < rightYPoints[rightIndex][1] ){
        results.push(leftYPoints[leftIndex++]);
      }else{
        results.push(rightYPoints[rightIndex++]);
      }
    }
    if( leftIndex === leftYPoints.length ){
      sideWithLeftovers = rightYPoints.slice(rightIndex);
    }else{
      sideWithLeftovers = leftYPoints.slice(leftIndex);
    }

    results = results.concat(sideWithLeftovers);
    return results;
  }

  // This function iterates appropriately through the points, sorted by y, that are potentially closer
  // together than any point on either half that is currently closest
  function iterateUpToSevenAway(points, closestDistance){
    var i, j, pointA, pointB, distance;
    var result;

    for(i = 0; i < points.length - 1; i++){
      for(j = i + 1; j < points.length && j < i + 8; j++){
        pointA = points[i];
        pointB = points[j];
        distance = calculateDistance(pointA, pointB);
        if( distance < closestDistance ){
          closestDistance = distance;
          result = {};
          result.closestDistance = distance;
          result.closestPoints = [pointA, pointB];
        }
      }
    }

    return result ? result : null;
  }

  module.exports = findClosestPoints;
})();