;(function(){
  'use strict';

  var fs = require('fs');
  var quickSortPivotFirst = require('./quickSortPivotFirst.js');

  var file = process.argv[2];

  fs.readFile(file, function(err, data){
    if( err ) throw err;

    var array = data.toString().split('\n');
    array.pop();

    var result = quickSortPivotFirst(array);
    console.log(result.slice(0, 15));
  });

})();