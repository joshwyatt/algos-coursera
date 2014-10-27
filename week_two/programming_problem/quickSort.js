function quickSort(array){
  if( array.length === 1 || array.length === 0 ) return array;
  var pivotIndex, pivot, i, j;

  pivotIndex = getAPivot(array.length);
  pivot = array[pivotIndex];
  array = swap(array, 0, pivotIndex);

  i = j = 1;
  array.forEach(sortAroundPivot);
  array = swap(array, 0, i - 1);

  return quickSort(array.slice(0, i - 1)).concat(array[i - 1]).concat(quickSort(array.slice(i)));

  function getAPivot(length){
    return Math.floor(Math.random() * length);
  }

  function swap(array, indexOne, indexTwo){
    var temp = [];

    temp = array[indexOne];
    array[indexOne] = array[indexTwo];
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