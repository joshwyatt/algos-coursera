;(function(){
  function findClosestPoints(points){
    var closestPointsDetails = {
      closestPoints: [undefined, undefined],
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

      return results;

    }
    function recursivelySubdivide(points){
      if( points.length <= 1 ){
        return {
          sortedByX: points,
          sortedByY: points,
          closestPoints: undefined,
          closestDistance: undefined
        };
      }

      var centerIndex, leftHalf, rightHalf, sortedLeftHalf, sortedRightHalf;

      centerIndex = Math.ceil(points.length / 2);
      leftHalf = points.slice(0, centerIndex);
      rightHalf = points.slice(centerIndex);

      processedLeftHalf = recursivelySubdivide(leftHalf);
      processedRightHalf = recursivelySubdivide(rightHalf);

      // mergeSortAndFindClosest(processedLeftHalf, processedRightHalf);
    }

    recursivelySubdivide(points);
    console.log(closestPointsDetails.closestPoints);
    return closestPointsDetails.closestPoints;
  }

  module.exports = findClosestPoints;
})();