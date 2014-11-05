var adjacencyList = {
  1: [2, 3],
  2: [1, 4],
  3: [1, 4],
  4: [2, 3]
};

var allEdges = [[1,2], [1,3], [2,1], [2,4], [3,1], [3,4], [4,2], [4,3]];
var numberOfEdges = calculateNumberOfEdges(adjacencyList);

//randomly pick an edge
function pickRandomEdge(adjacencyList){
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
  return [keys[ticker], adjacencyList[keys[ticker]][randomIndex]];
}

//how many edges are there.
function calculateNumberOfEdges(adjacencyList){
  var edges = 0;
  for( var vertice in adjacencyList ){
    edges += adjacencyList[vertice].length;
  }
  return edges;
}

//collapse edge
function collapseEdge(edge, adjacencyList){
  var verticeOne = edge[0];
  var verticeTwo = edge[1];
  //concat array at verticeTwo to array at verticeOne
}

show(pickRandomEdge(adjacencyList));