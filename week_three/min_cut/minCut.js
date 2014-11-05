;function(){
  'use strict';
  function minCut(adjacencyList){

    while( Object.keys(adjacencyList).length > 2 ){
      var numberOfEdges = calculateNumberOfEdges(adjacencyList);
      var edge = pickRandomEdge(adjacencyList, numberOfEdges);

      collapseEdge(edge, adjacencyList);
    }

    return adjacencyList[Object.keys(adjacencyList)[0]].length;

    //randomly pick an edge
    function pickRandomEdge(adjacencyList, numberOfEdges){
      var randomIndex = Math.floor(Math.random() * numberOfEdges);
      var keys = Object.keys(adjacencyList);
      var ticker = 0;
      // debugger;
      //while the current property length is greater than random index
      while( randomIndex > adjacencyList[keys[ticker]].length - 1 ){
        // decrement randomIndex and go to next property
        randomIndex -= adjacencyList[keys[ticker++]].length;
      }
      // return edge at index of randomIndex of this property
      return [+keys[ticker], adjacencyList[keys[ticker]][randomIndex]];
    }

    //how many edges are there.
    function calculateNumberOfEdges(adjacencyList){
      var edges = 0;
      for( var vertex in adjacencyList ){
        edges += adjacencyList[vertex].length;
      }
      return edges;
    }

    //collapse edge
    function collapseEdge(edge, adjacencyList){
      var vertexOne = edge[0];
      var vertexTwo = edge[1];
      //concat array at vertexTwo to array at vertexOne
      adjacencyList[vertexOne] = adjacencyList[vertexOne].concat(adjacencyList[vertexTwo]);
      //delete vertexTwo
      delete adjacencyList[vertexTwo];
      //iterate over edges at vertexOne and delete any ref to vertexOne or vertexTwo
      adjacencyList[vertexOne] = adjacencyList[vertexOne].filter(function(vertex){
        return !(vertex === vertexOne || vertex === vertexTwo);
      });
      //iterate over all arrays and remove any reference to vertexTwo
      for(var vertexKey in adjacencyList){
        adjacencyList[vertexKey] = adjacencyList[vertexKey].map(function(vertex){
          return vertex === vertexTwo ? vertexOne : vertex;
        });
      }
    }
  }
  module.exports = minCut;
}();