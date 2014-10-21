;(function(){
  var mergeSortByXorY = require('./mergeSortByXorY.js');

  function findClosestPoints(points){

    // preprocess by sorting all points by x
    var pointsSortedByX = mergeSortByXorY(points, 'x');
    // preprocess by sorting all points by y
    var pointsSortedByY = mergeSortByXorY(points, 'y');

    // begin divide part of divide and conquer for calculating distances
    function divideOnXAndMerge(points){
      // initialize variables
      var distanceA, distanceB, distanceC;
      var centerIndex, leftHalf, rightHalf, processedLeftHalf, processedRightHalf;

      // if array only contains two or three points
      if( points.length <= 3 ){
        // calculate the shortest point and return
        if( points.length === 3){

          distanceA = calculateDistance(points[0], points[1]);
          distanceB = calculateDistance(points[0], points[2]);
          distanceC = calculateDistance(points[1], points[2]);

          return Math.min(distanceA, distanceB, distanceC);

        }else{
          return calculateDistance(points[0], points[1]);
        }
      }

      // recursively split on x until down to base case where we have only 2 points
      // to calculate the distance between
      centerIndex = Math.ceil(points.length / 2);
      leftHalf = points.slice(0, centerIndex);
      rightHalf = points.slice(centerIndex);

      processedLeftHalf = divideOnXAndMerge(leftHalf);
      processedRightHalf = divideOnXAndMerge(rightHalf);

      merge(processedLeftHalf, processedRightHalf);

    }
  }

  function merge(leftHalf, rightHalf){
    
  }

  function calculateDistance(pointOne, pointTwo){
    var distanceBetweenX = pointOne[0] - pointTwo[0];
    var distanceBetweenY = pointOne[1] - pointTwo[1];
    return Math.sqrt(Math.pow(distanceBetweenX, 2) + Math.pow(distanceBetweenY, 2));
  }

  module.exports = findClosestPoints;
})();