;(function(){

  function rSelect(array, orderStatistic, lowerIndex, upperIndex){
    var length, pivotIndex, pivot, partition, partitionIndex;

    lowerIndex = lowerIndex || 0;
    upperIndex = upperIndex || array.length - 1;

    length = upperIndex - lowerIndex + 1;
    pivotIndex = chooseRandomPivotIndex(length) + lowerIndex;
    pivot = array[pivotIndex];
    partition = partitionAroundPivot(array, pivot, pivotIndex);
    array = partition.array;
    partitionIndex = partition.partitionIndex;

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

  var array = [3,9,5,7,4,1,0];
  console.log(rSelect(array, 6));

  // module.exports = rSelect;
})();