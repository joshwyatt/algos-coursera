var fs = require('fs');
var directedGraphFile = process.argv[2];
var directedGraph = {};
var reversedDirectedGraph = {};
var directedGraphRows;

//read file to look like this, for both directed graph and reversedDirectedGraph
/*
1: [2,3,4,5],
2: [4,6,7,8]
*/

fs.readFile(directedGraphFile, function(err, data){
  if( err ) throw err;
  console.log('------> read file and now have data');

  directedGraphRows = data.toString().split('\n');
  directedGraphRows.forEach(function(row){
    row = row.split(' ');
    row.pop();
    directedGraph[row[0]] = directedGraph[row[0]] || [];
    directedGraph[row[0]].push(row[1]);

    reversedDirectedGraph[row[1]] = reversedDirectedGraph[row[1]] || [];
    reversedDirectedGraph[row[1]].push(row[0]);
  });
  console.log('------> finished creating data structures');

  var finishingTimeCounter = 1;
  var currentLeader = null;
  var nodesMappedByFinishingTime = {};
  var alreadyVisitedNodesFirstPass = {};
  var alreadyVisitedNodesSecondPass = {};
  var SCCSizes = [];
  //PASS 1
  //iterate backwards through reversed graph object
  // for(var i = 875714; i > 0; i--){
  for(var i = 12; i > 0; i--){
    //if node hasn't been visited yet
    if( !alreadyVisitedNodesFirstPass[i] ){
      depthFirstSearchPassOne(i);
    }
  }
  console.log('------> completed first depth first pass');

  // for(var j = 875714; j > 0; j--){
  for(var j = 12; j > 0; j--){
    if( nodesMappedByFinishingTime[j] ){
      var nodeByFinishingTime = nodesMappedByFinishingTime[j]
      //if node hasn't been visited yet
      if( !alreadyVisitedNodesSecondPass[nodeByFinishingTime] ){
        depthFirstSearchPassTwo(nodeByFinishingTime);
      }
    }
  }
  console.log('------> completed second depth first pass');

  SCCSizes = SCCSizes.sort(function(a,b){
    return b - a;
  });
  if( SCCSizes.length >= 5 ){
    console.log(SCCSizes.slice(0, 5));
    return SCCSizes.slice(0, 5);
  }else{
    console.log(SCCSizes);
    return SCCSizes;
  }

  function depthFirstSearchPassOne(node){
    nodesGivenTime = {};
    nodes = [];
    nodes.push(node);
    //while nodes
    while( nodes.length ){
      //currentNode = last in nodes
      var currentNode = nodes[nodes.length - 1];
      //if current node has been visited
      if( alreadyVisitedNodesFirstPass[currentNode] ){
        //pop it off and give it number++
        var possibleNodeToCount = nodes.pop();
        if( !nodesGivenTime[possibleNodeToCount] ){
          nodesMappedByFinishingTime[finishingTimeCounter++] = possibleNodeToCount;
          nodesGivenTime[possibleNodeToCount] = true;
        }
      }else{
        //mark current node as visited
        alreadyVisitedNodesFirstPass[currentNode] = true;
        //calculate "viable children"
        if( reversedDirectedGraph[currentNode] ){
          var connectedNodesNotYetExplored = reversedDirectedGraph[currentNode].filter(function(possibleNode){
            return !alreadyVisitedNodesFirstPass[possibleNode];
          });
        }
        //if no viable children
        if( !connectedNodesNotYetExplored || !connectedNodesNotYetExplored.length ){
          //pop it off and give it a number
          if( reversedDirectedGraph[currentNode] ){
            var possibleNodeToCount = nodes.pop();
            if( !nodesGivenTime[possibleNodeToCount] ){
              nodesMappedByFinishingTime[finishingTimeCounter++] = possibleNodeToCount;
              nodesGivenTime[possibleNodeToCount] = true;
            }
          }else{
            var possibleNodeToCount = nodes.pop();
            if( !nodesGivenTime[possibleNodeToCount] ){
              nodesMappedByFinishingTime[finishingTimeCounter++] = possibleNodeToCount;
              nodesGivenTime[possibleNodeToCount] = true;
            }
          }
        }else{
          connectedNodesNotYetExplored.forEach(function(nodeToExplore){
            nodes.push(nodeToExplore);
          });
        }
      }
    }
  }

  function depthFirstSearchPassTwo(node){
    var nodesInStack = {};
    var SCCSize = 1;
    var nodes = [];
    nodes.push(node);
    nodesInStack[node] = true;

    while( nodes.length ){
      var currentNode = nodes[nodes.length - 1];
      if( alreadyVisitedNodesSecondPass[currentNode] ){
        nodes.pop();
      }else{
        alreadyVisitedNodesSecondPass[currentNode] = true;

        if( directedGraph[currentNode] ){
          var connectedNodesNotYetExplored = directedGraph[currentNode].filter(function(possibleNode){
            return !alreadyVisitedNodesSecondPass[possibleNode];
          });
        }
        if( !connectedNodesNotYetExplored || !connectedNodesNotYetExplored.length ){
          nodes.pop();
        }else{
          connectedNodesNotYetExplored.forEach(function(nodeToExplore){
            if( !nodesInStack[nodeToExplore] ){
              nodesInStack[nodeToExplore] = true;
              nodes.push(nodeToExplore);
              SCCSize++;
            }
          });
        }
      }
    }
    SCCSizes.push(SCCSize);
  }

});






