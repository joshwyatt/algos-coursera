;(function(){

  function TwoDGraph(xMin, yMin, xMax, yMax, numberOfPoints){
    
    this.xMin = xMin;
    this.yMin = yMin;
    this.xMax = xMax;
    this.yMax = yMax;
    this.numberOfPoints = numberOfPoints;
  }

  module.exports = TwoDGraph;

})();