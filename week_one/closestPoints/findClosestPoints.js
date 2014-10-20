;(function(){
  function findClosestPoints(points){
    var closestPointsDetails = {
      closestPoints: [],
      distance: undefined
    };

    function mergeSortAndFindClosest(leftPoints, rightPoints){

      var halfWithLeftovers;
      var xLeftIndex = 0;
      var yLeftIndex = 0;
      var xRightIndex = 0;
      var yRightIndex = 0;

      var results = {
        sortedByX: [],
        sortedByY: [],
        closestPoints: undefined,
        closestDistance: undefined
      };

      //if single points, calculate distance between the two
      if( leftPoints.sortedByX.length === 1 && rightPoints.sortedByX.length === 1 ){
        var onlyXPoint = leftPoints.sortedByX[0];
        var onlyYPoint = rightPoints.sortedByY[0];
        results.closestDistance = calculateDistance(onlyXPoint, onlyYPoint);
        results.closestPoints = [onlyXPoint, onlyYPoint];
      }

      //merge into sorted by x
      while( xLeftIndex < leftPoints.sortedByX.length && xRightIndex < rightPoints.sortedByX.length ){
        if( leftPoints.sortedByX[xLeftIndex][0] < rightPoints.sortedByX[xRightIndex][0] ){
          results.sortedByX.push(leftPoints.sortedByX[xLeftIndex++]);
        }else{
          results.sortedByX.push(rightPoints.sortedByX[xRightIndex++]);
        }

        if( xLeftIndex === leftPoints.sortedByX.length ){
          halfWithLeftovers = rightPoints.sortedByX.slice(xRightIndex);
        }else{
          halfWithLeftovers = leftPoints.sortedByX.slice(xLeftIndex);
        }

        results.sortedByX.concat(halfWithLeftovers);
      }

      //merge into sorted by y
      while( yLeftIndex < leftPoints.sortedByY.length && yRightIndex < rightPoints.sortedByY.length ){
        if( leftPoints.sortedByY[yLeftIndex][1] < rightPoints.sortedByY[yRightIndex][1] ){
          results.sortedByY.push(leftPoints.sortedByY[yLeftIndex++]);
        }else{
          results.sortedByY.push(rightPoints.sortedByY[yRightIndex++]);
        }

        if( yLeftIndex === leftPoints.sortedByY.length ){
          halfWithLeftovers = rightPoints.sortedByY.slice(yRightIndex);
        }else{
          halfWithLeftovers = leftPoints.sortedByY.slice(yLeftIndex);
        }

        results.sortedByY.concat(halfWithLeftovers);
      }

      return results;

    }
    function recursivelySubdivide(points){
      if( points.length <= 1 ){
        return {
          sortedByX: points,
          sortedByY: points,
          closestPoints: [],
          closestDistance: undefined
        };
      }

      var centerIndex, leftHalf, rightHalf, sortedLeftHalf, sortedRightHalf;

      centerIndex = Math.ceil(points.length / 2);
      leftHalf = points.slice(0, centerIndex);
      rightHalf = points.slice(centerIndex);

      processedLeftHalf = recursivelySubdivide(leftHalf);
      processedRightHalf = recursivelySubdivide(rightHalf);

      return mergeSortAndFindClosest(processedLeftHalf, processedRightHalf);
    }

    function calculateDistance(pointOne, pointTwo){
      var distanceBetweenX = pointOne[0] - pointTwo[0];
      var distanceBetweenY = pointOne[1] - pointTwo[1];
      return Math.sqrt(Math.pow(distanceBetweenX, 2) + Math.pow(distanceBetweenY, 2));
    }

    recursivelySubdivide(points);
    console.log(closestPointsDetails.closestPoints);
    return closestPointsDetails.closestPoints;
  }

  module.exports = findClosestPoints;
})();