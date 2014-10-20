;(function(){
  function findClosestPoints(points){
    var closestPointsDetails = {
      closestPoints: [],
      distance: undefined
    };

    function mergeSortAndFindClosest(processedLeftPoints, processedRightPoints){

      var halfWithLeftovers;
      var xLeftIndex = 0;
      var yLeftIndex = 0;
      var xRightIndex = 0;
      var yRightIndex = 0;

      var results = {
        sortedByX: [],
        sortedByY: [],
        closestPoints: [],
        closestDistance: 0
      };

      //if single points, calculate distance between the two

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

      mergeSortAndFindClosest(processedLeftHalf, processedRightHalf);
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