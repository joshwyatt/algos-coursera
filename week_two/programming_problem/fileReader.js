;(function(){
  'use strict';

  var fs = require('fs');
  var quickSortPivotFirst = require('./quickSortPivotFirst.js');
  var quickSortPivotLast = require('./quickSortPivotLast.js');

  var file = process.argv[2];

  fs.readFile(file, function(err, data){
    if( err ) throw err;

    var array = data.toString().split('\n');
    array.pop();

    var pivotFirstResult = quickSortPivotFirst.quickSortPivotFirst(array);
    var pivotFirstNumberOfComparisons = quickSortPivotFirst.numberOfComparisons;
    console.log(pivotFirstResult.slice(0, 15));
    console.log(pivotFirstNumberOfComparisons);

    var pivotLastResult = quickSortPivotLast.quickSortPivotLast(array);
    var pivotLastNumberOfComparisons = quickSortPivotLast.numberOfComparisons;
    console.log(pivotLastResult.slice(0, 15));
    console.log(pivotLastNumberOfComparisons);
  });

})();