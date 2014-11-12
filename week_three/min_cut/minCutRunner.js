;(function(){

  var fs = require('fs');
  var minCut = require('./minCut.js');
  var adjacencyList = process.argv[2];

  var smallestResult;
  var formattedAdjacencyList = {};

  fs.readFile(adjacencyList, function(err, data){
    if( err ) throw err;

    var adjacencyListRows = data.toString().split('\n');
    adjacencyListRows.pop();

    adjacencyListRows.forEach(function(row){
      row = row.split(/\s+/g);
      row.pop();
      for(var i = 0; i < row.length; i++){
        if( i === 0 ){
          formattedAdjacencyList[row[0]] = [];
        }else{
          formattedAdjacencyList[row[0]].push(row[i]);
        }
      }
    });

    for(var i = 0; i < 3000; i++){
      var copyOfFormattedAdjacencyList = copyFormattedAdjacencyList(formattedAdjacencyList);
      var result = minCut(copyOfFormattedAdjacencyList);
      if( !smallestResult || result < smallestResult ){
        smallestResult = result;
        console.log('The smallest result so far is: ' + smallestResult);
      }
    }
    console.log('Mincut is complete and the smallest result is: ' + smallestResult);
  });

  function copyFormattedAdjacencyList(formattedAdjacencyList){
    var copy = {};
    for(var k in formattedAdjacencyList){
      copy[k] = formattedAdjacencyList[k];
    }
    return copy;
  }

})();