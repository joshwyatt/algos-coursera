function mergeSort(array){
  
  function merge(leftHalf, rightHalf){
    var leftIndex, rightIndex, results, remaining;

    while( leftIndex < leftHalf.length && rightIndex < rightHalf.length ){

      if( leftHalf[leftIndex] < rightHalf[rightIndex] ){
        results.push(leftHalf[leftIndex++]);
      }else{
        results.push(rightHalf[rightIndex++]);
      }

    }

    remainingHalf = leftIndex === leftHalf.length ? rightHalf.slice(rightIndex) : leftHalf(leftIndex);
    return results.concat(remaining);
  }

  if( array.length <= 1 ) return array;

  var centerIndex, leftHalf, rightHalf, sortedLeftHalf, sortedRightHalf;

  //split array into 2 halves
  centerIndex = Math.ceil(array.length / 2);
  leftHalf = array.slice(0, centerIndex);
  rightHalf = array.slice(centerIndex);

  sortedLeftHalf = mergeSort(leftHalf);
  sortedRightHalf = mergeSort(rightHalf);

  return merge(sortedLeftHalf, sortedRightHalf);

}