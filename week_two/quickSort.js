function quickSort(array){
  var pivotIndex, pivot, i, j;

  // get a pivot
  pivotIndex = getAPivot(array.length);
  pivot = array[pivotIndex];
  // swap it to the beginning
  swap(array, 0, pivot);

  // initialize i(the above/below divider) and j(the seen/unseen divider) to 1
  i = j = 1;
  array.forEach(sortAroundPivot);
  // for j to array.length
    // if array[j] < pivot
      // swap array[j] with array[i]
      // i++

  // swap pivot with array[i - 1]
  swap(array, 0, i - 1);
  //return quickSort(array.slice(0, i - 1)).concat(array[i - 1]).concat(quickSort(array.slice(i)));
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
      swap(array, index, i);
      i++;
    }
  }
}