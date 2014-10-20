;(function(){

  function TwoDGraph(xMin, yMin, xMax, yMax, numberOfPoints){

    this.xMin = xMin;
    this.yMin = yMin;
    this.xMax = xMax;
    this.yMax = yMax;
    this.numberOfPoints = numberOfPoints;

  }

  TwoDGraph.prototype.generatePoints = function(){
    var randomX, randomY;
    var alreadyUsedXs = {};
    var alreadyUsedYs = {};
    var points = [];

    var numberOfPoints = this.numberOfPoints;

    function generateRandomX(min, max){
      return Math.floor(Math.random() * (max - min)) + parseInt(min);
    }

    function generateRandomY(min, max){
      return Math.floor(Math.random() * (max - min)) + parseInt(min);
    }

    while( numberOfPoints-- ){

      randomX = generateRandomX(this.xMin, this.xMax);
      while( alreadyUsedXs.hasOwnProperty(randomX) ){
        randomX = generateRandomX(this.xMin, this.xMax);
      }
      alreadyUsedXs[randomX] = true;

      randomY = generateRandomY(this.yMin, this.yMax);
      while( alreadyUsedYs.hasOwnProperty(randomY) ){
        randomY = generateRandomY(this.yMin, this.yMax);
      }
      alreadyUsedYs[randomY] = true;

      console.log([randomX, randomY]);
    }

    return points;
  };

  module.exports = TwoDGraph;

})();