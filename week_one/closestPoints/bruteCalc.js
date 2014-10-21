;(function(){
  function calculateDistance(pointOne, pointTwo){
    var distanceBetweenX = pointOne[0] - pointTwo[0];
    var distanceBetweenY = pointOne[1] - pointTwo[1];
    return Math.sqrt(Math.pow(distanceBetweenX, 2) + Math.pow(distanceBetweenY, 2));
  }

  function bruteCalc(points){
    var smallest;
    for(var i = 0; i < points.length - 1; i++){
      for(var j = i + 1; j < points.length; j++){
        var distance = calculateDistance(points[i], points[j]);
        if( !smallest || distance < smallest ){
          smallest = distance;
        }
      }
    }
    return smallest;
  }

  module.exports = bruteCalc;
})();
