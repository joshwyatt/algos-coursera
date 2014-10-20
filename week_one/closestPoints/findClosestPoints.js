;(function(){
  function findClosestPoints(points){
    var closestPoints;

    function mergeSortAndFindClosest(leftPoints, rightPoints){

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
      if( points.length <= 1 ) return points;

      var centerIndex, leftHalf, rightHalf, sortedLeftHalf, sortedRightHalf;

      centerIndex = Math.ceil(points.length / 2);
      leftHalf = points.slice(0, centerIndex);
      rightHalf = points.slice(centerIndex);
    }

    return closestPoints;
  }

  module.exports = findClosestPoints;
})();