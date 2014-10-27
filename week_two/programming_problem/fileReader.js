;(function(){
  'use strict';

  var fs = require('fs');
  var file = process.argv[2];

  fs.readFile(file, function(err, data){
    if( err ) throw err;

    var array = data.toString().split('\n');
    array.pop();
  });

})();