;(function(){

  var fs = require('fs');
  var minCut = require('./minCut.js');
  var adjacencyList = process.argv[2];

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
  });
})();