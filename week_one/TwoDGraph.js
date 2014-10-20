;(function(){

  function TwoDGraph(xMin, yMin, xMax, yMax, numberOfPoints){

    this.xMin = xMin;
    this.yMin = yMin;
    this.xMax = xMax;
    this.yMax = yMax;
    this.numberOfPoints = numberOfPoints;

  }

  TwoDGraph.prototype.generatePoints = function(){
    var points = [];

    while( this.numberOfPoints-- ){
      console.log(this.numberOfPoints);
    }

    return points;
  };

  module.exports = TwoDGraph;

})();