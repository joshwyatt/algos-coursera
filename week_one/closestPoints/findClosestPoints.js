;(function(){
  var mergeSortByXorY = require('./mergeSortByXorY.js');

  function findClosestPoints(points){

    // preprocess by sorting all points by x
    var pointsSortedByX = mergeSortByXorY(points, 'x');
    console.log(pointsSortedByX);

    // preprocess by sorting all points by y
    var pointsSortedByY = mergeSortByXorY(points, 'y');
    console.log((pointsSortedByY));

    // recursively split on x until down to base case where we have a single computation
    // for distance
  }

  module.exports = findClosestPoints;
})();