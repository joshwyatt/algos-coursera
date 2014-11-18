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
  var SCCSize = 0;
  //PASS 1
  //iterate backwards through reversed graph object
  for(var i = 875714; i > 0; i--){
    //if node hasn't been visited yet
    if( !alreadyVisitedNodesFirstPass[i] ){
      depthFirstSearchPassOne(i);
    }
  }

  console.log('still alive');
  function depthFirstSearchPassOne(node){
    nodes = [];
    nodes.push(node);
    //while nodes
    while( nodes.length ){
      //currentNode = last in nodes
      var currentNode = nodes[nodes.length - 1];
      //if current node has been visited
      if( alreadyVisitedNodesFirstPass[currentNode] ){
        //pop it off and give it number++
        nodesMappedByFinishingTime[finishingTimeCounter++] = nodes.pop();
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
          nodesMappedByFinishingTime[finishingTimeCounter++] = nodes.pop();
        }else{
          connectedNodesNotYetExplored.forEach(function(nodeToExplore){
            nodes.push(nodeToExplore);
          });
        }
      }
    }

    // var nodes = [];
    // nodes.push(node);
    // while( nodes ){
    //   node = nodes.pop();
    //   //if node hasn't been visited yet
    //   if( !alreadyVisitedNodesFirstPass[node] ){
    //     //add it to visited
    //     alreadyVisitedNodesFirstPass[node] = true;
    //     //for each edge
    //     if( reversedDirectedGraph[node] ){
    //       reversedDirectedGraph[node].forEach(function(attachedNode){
    //         //dfs(edge)
    //         nodes.push(attachedNode);
    //       });
    //     }
    // }
    //   //nodesMappedByFinishingTime[finishingTimeCounter++] = node;
    //   nodesMappedByFinishingTime[finishingTimeCounter++] = node;
    // }
  }

  //PASS 2
  //iterate backwards through mapping of nodes by finishing time
    //if node hasn't been visited
      //if SCCSize !== 0
        //SCCSizes.push(SCCSize);
        //SCCSize = 0;
      //dfs(node):
        //if node hasn't been visited yet
          //add it to visited
          //SCCSize++;
          //for each edge
            //dfs(edge)
});






