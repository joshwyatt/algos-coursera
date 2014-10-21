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
    var closestInOneHalf, closestDistanceBetweenHalves, closestPoints;

    var results = {
      closestDistance: undefined,
      closestPoints: undefined,
      pointsByX: undefined,
      pointsByY: undefined
    };

    // calculate closest distance and points already discovered in left and right halves
    if( leftHalf.closestDistance < rightHalf.closestDistance ){
      closestDistanceBetweenHalves = leftHalf.closestDistance;
      closestPoints = leftHalf.closestPoints;
    }else{
      closestDistanceBetweenHalves = rightHalf.closestDistance;
      closestPoints = rightHalf.closestPoints;
    }

    results.pointsByX = leftHalf.pointsByX.concat(rightHalf.pointsByX);
    results.pointsByY = leftHalf.pointsByY.concat(rightHalf.pointsByY);

    closestInOneHalf = Math.min(leftHalf.closestDistance, rightHalf.closestDistance);
    closestDistanceBetweenHalves = calculateClosestBetweenHalves(leftHalf, rightHalf, closestInOneHalf, nearestPoints);

///I AM RIGHT HERE. I JUST PASSES STUFF ALL THE WAY BACK UP. I JUST NEED TO SEE IF THERE ARE RESULTS
// FROM THE CALLS BELOW IN WHICH CASE I NEED TO MODIFY RESULTS, OTHERWISE DON'T MODIFY IT

    return results;
  }

  function calculateClosestBetweenHalves(leftHalf, rightHalf, closestInOneHalf, nearestPoints){
    var lastLeftIndex, verticalMiddle, xAxisMax, xAxisMin, leftYPoints, rightYPoints,
        leftPointsToEvaluate, rightPointsToEvaluate, pointsToEvaluate;

    lastLeftIndex = leftHalf.pointsByX.length - 1;
    verticalMiddle = leftHalf.pointsByX[lastleftIndex][0];

    xAxisMax = verticalMiddle + closestInOneHalf;
    xAxisMin = verticalMiddle - closestInOneHalf;

    leftYPoints = leftHalf.pointsByY;
    rightYPoints = rightHalf.pointsByY;

    leftPointsToEvaluate = leftYPoints.reduce(function(point){
      return isBetweenXMinAndXMax(point, xAxisMin, xAxisMax);
    }, []);

    rightPointsToEvaluate = rightYPoints.reduce(function(point){
      return isBetweenXMinAndXMax(point, xAxisMin, xAxisMax);
    }, []);

    pointsToEvaluate = sortYPoints(leftYPoints, rightYPoints);

    closestDistanceBetweenHalves = iterateUpToSevenAway(pointsToEvaluate, closestInOneHalf, nearestPoints);
    return closestDistanceBetweenHalves ? calculateClosestBetweenHalves: null;

  }

  function isBetweenXMinAndXMax(point, xAxisMin, xAxisMax){
    var x = point[0];
    return x > xAxisMin && x < xAxisMax;
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

  function sortYPoints(leftYPoints, rightYPoints){
    var sideWithLeftovers;
    var leftIndex = 0;
    var rightIndex = 0;
    var results = [];

    while( leftIndex < leftYPoints.length && rightIndex < rightYPoints.length ){
      if( leftYPoints[leftIndex] < rightYPoints[rightIndex] ){
        results.push(leftYPoints[leftIndex++]);
      }else{
        results.push(rightYPoints[rightIndex++]);
      }
    }
    if( leftIndex === leftYPoints.length ){
      sideWithLeftovers = rightYPoints;
    }else{
      sideWithLeftovers = leftYPoints;
    }

    results.concat(sideWithLeftovers);
    return results;
  }

  function iterateUpToSevenAway(points, currentlyShortestDistance, nearestPoints){
    var i, j, pointA, pointB, distance;
    var result;

    for(i = 0; i < points.length - 7; i++){
      for(j = i; j < i + 8; j++){
        pointA = points[i];
        pointB = points[j];
        distance = calculateDistance(pointA, pointB);
        if( distance < currentlyShortestDistance ){
          result = {};
          result.currentlyShortestDistance = distance;
          result.nearestPoints = [pointA, pointB];
        }
      }
    }
    return result ? result : null;
  }

  module.exports = findClosestPoints;
})();