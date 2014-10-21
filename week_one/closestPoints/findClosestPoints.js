;(function(){
  var mergeSortByXorY = require('./mergeSortByXorY.js');

  function findClosestPoints(points){
    var pointsSortedByX = mergeSortByXorY(points, 'x');
    console.log(pointsSortedByX);

    var pointsSortedByY = mergeSortByXorY(points, 'y');
    console.log((pointsSortedByY));
  }

  module.exports = findClosestPoints;
})();