var fs = require('fs');
var directedGraphFile = process.argv[2];
var directedGraph = {};
var reversedDirectedGraph = {};

//read file to look like this, for both directed graph and reversedDirectedGraph
/*
1: [2,3,4,5],
2: [4,6,7,8]
*/

fs.readFile()

var finishingTimeCounter = 1;
var currentLeader = null;
var nodesMappedByFinishingTime = {};
var alreadyVisitedNodes = {};
var SCCSizes = [];
var SCCSize = 0;
//PASS 1
//iterate backwards through reversed graph object
  //if node hasn't been visited yet
    //dfs(node):
      //if node hasn't been visited yet
        //add it to visited
        //for each edge
          //dfs(edge)
        //nodesMappedByFinishingTime[finishingTimeCounter++] = node;

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





