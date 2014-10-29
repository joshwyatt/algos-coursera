;(function(){

  function rSelect(array, orderStatistic, lowerIndex, upperIndex){
    var length, pivotIndex, pivot, partitionDetails, partitionIndex;

    lowerIndex = lowerIndex || 0;
    upperIndex = upperIndex || array.length - 1;

    length = upperIndex - lowerIndex + 1;

    if( length === 1 ) return upperIndex;
    
    pivotIndex = chooseRandomPivotIndex(length) + lowerIndex;
    pivot = array[pivotIndex];
    partitionDetails = partitionAroundPivot(array, pivot, pivotIndex);
    array = partitionDetails.array;
    partitionIndex = partitionDetails.partitionIndex;

    if( partitionIndex === orderStatistic ){
      return pivot;
    }else if( partitionIndex > orderStatistic ){
      return rSelect(array, orderStatistic, lowerIndex, partitionIndex - 1);
    }else{
      return rSelect(array, orderStatistic, partitionIndex + 1, upperIndex);
    }
  }

  function chooseRandomPivotIndex(length){
    return Math.floor(Math.random() * length);
  }

  function partitionAroundPivot(array, pivot, pivotIndex){
    var i = 1;
    array = swap(array, pivotIndex, 0);

    array.forEach(function(item, index){
      if( item < pivot ){
        array = swap(array, index, i++);
      }
    });

    array = swap(array, 0, --i);

    return {
      array: array,
      partitionIndex: i
    };
  }

  function swap(array, indexOne, indexTwo){
    var temp = [];
    temp = array[indexOne];
    array[indexOne] = array[indexTwo];
    array[indexTwo] = temp;

    return array;
  }

  module.exports = rSelect;

})();