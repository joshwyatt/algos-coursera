;(function(){

  function TwoDGraph(xMin, yMin, xMax, yMax, numberOfPoints){

    this.xMin = xMin;
    this.yMin = yMin;
    this.xMax = xMax;
    this.yMax = yMax;
    this.numberOfPoints = numberOfPoints;

  }

  TwoDGraph.prototype.generatePoints = function(){
    var randomX;
    var alreadyUsedXs = {};
    var alreadyUsedYs = {};
    var points = [];

    var numberOfPoints = this.numberOfPoints;

    while( numberOfPoints-- ){
      randomX = Math.floor(Math.random() * (this.xMax - this.xMin)) + parseInt(this.xMin);
      randomY = Math.floor(Math.random() * (this.yMax - this.yMin)) + parseInt(this.yMin);
      console.log([randomX, randomY]);
    }

    return points;
  };

  module.exports = TwoDGraph;

})();