;(function(){
  var fs = require('fs');
  var countInversions = require('./countInversions.js');
  var file = process.argv[2];


  fs.readFile(file, function(err, data){
    if( err ) throw err;

    // var array = [4,5,6];

    var array = data.toString().split('\n');
    // array.pop();

    // var total = 0;
    // for(var i = 1; i <= array.length; i++){
    //   total += i;
    // }
    // console.log(total);
    // console.log(array.length);
    console.log(countInversions(array));

    // for(var i = 0; i < array.length - 1; i++){
    //   if( array[i] > array[i + 1] ){
    //     console.log('not sorted');
    //   }
    // }
    // console.log('at end');

  });

})();
