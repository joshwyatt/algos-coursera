;(function(){
  'use strict';

  module.exports.numberOfComparisons = 0;

  module.exports.quickSortPivotLast = function(array){
    if( array.length === 1 || array.length === 0 ) return array;
    var pivotIndex, pivot, i, j, leftHalf, rightHalf;

    pivotIndex = array.length - 1;
    pivot = +array[pivotIndex];
    array = swap(array, 0, pivotIndex);

    i = j = 1;
    array.forEach(sortAroundPivot);
    array = swap(array, 0, i - 1);

    leftHalf = array.slice(0, i - 1);
    rightHalf = array.slice(i);
    module.exports.numberOfComparisons += leftHalf.length + rightHalf.length;

    return module.exports.quickSortPivotLast(leftHalf).concat(array[i - 1]).concat(module.exports.quickSortPivotLast(rightHalf));

    function getAPivot(length){
      return Math.floor(Math.random() * length);
    }

    function swap(array, indexOne, indexTwo){
      var temp = [];

      temp = +array[indexOne];
      array[indexOne] = +array[indexTwo];
      array[indexTwo] = temp;

      return array;
    }

    function sortAroundPivot(item, index){
      if( item < pivot ){
        array = swap(array, index, i);
        i++;
      }
    }
  }

})();