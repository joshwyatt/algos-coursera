;(function(){
  var TwoDGraph = require('./TwoDGraph.js');
  var findClosestPoints = require('./findClosestPoints.js');

  if( process.argv.length !== 7 ){
    console.log('Usage:');
    console.log('node closestPoints.js [xMin] [yMin] [xMax] [yMax] [numberOfPoints]');
  }

  var points;
  var xMin = process.argv[2];
  var yMin = process.argv[3];
  var xMax = process.argv[4];
  var yMax = process.argv[5];
  var numberOfPoints = process.argv[6];

  var twoDGraph = new TwoDGraph(xMin, yMin, xMax, yMax, numberOfPoints);

  points = twoDGraph.points;
  var closestPoints = findClosestPoints(points);
  console.log('The closest points are: ');
  console.log(closestPoints.closestPoints);
  console.log('\nWith a distance apart of: ');
  console.log(closestPoints.closestDistance);
})();