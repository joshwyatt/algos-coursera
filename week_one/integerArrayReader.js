;(function(){
  var fs = require('fs');
  var countInversions = require('./countInversions.js');
  var file = process.argv[2];


  fs.readFile(file, function(err, data){
    if( err ) throw err;
    var array = data.toString().split('\n');
    array.pop();

    var result = countInversions(array);
    console.log('The number of inversions for the array made out of %s is: %d', file, result);
    // console.log(result);
  });

})();
