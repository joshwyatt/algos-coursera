function mergeSortAndCountInversions(array){

  var numberOfInversions = 0;
  
  function mergeAndCountInversions(leftHalf, rightHalf){
    var leftIndex = 0;
    var rightIndex = 0;
    var results = [];
    var halfWithLeftovers;

    while( leftIndex < leftHalf.length && rightIndex < rightHalf.length ){

      if( leftHalf[leftIndex] < rightHalf[rightIndex] ){
        results.push(leftHalf[leftIndex++]);
      }else{
        results.push(rightHalf[rightIndex++]);
        numberOfInversions += leftHalf.length - leftIndex;
      }

    }

    if( leftIndex === leftHalf.length ){
      halfWithLeftovers = rightHalf.slice(rightIndex);
    }else{
      halfWithLeftovers = leftHalf.slice(leftIndex);
    }

    return results.concat(halfWithLeftovers);
  }

  function divideIntoSortedArrays(array){

    if( array.length <= 1 ) return array;

    var centerIndex, leftHalf, rightHalf, sortedLeftHalf, sortedRightHalf;

    //split array into 2 halves
    centerIndex = Math.ceil(array.length / 2);
    leftHalf = array.slice(0, centerIndex);
    rightHalf = array.slice(centerIndex);

    sortedLeftHalf = divideIntoSortedArrays(leftHalf);
    sortedRightHalf = divideIntoSortedArrays(rightHalf);

    return mergeAndCountInversions(sortedLeftHalf, sortedRightHalf);

  }

  divideIntoSortedArrays(array);
  return numberOfInversions;

}