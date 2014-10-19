;(function(){
  // This is an only slightly modified merge sort that will count the number of 
  // inversions in the passed-in array.
  function mergeSortAndCountInversions(array){

    var numberOfInversions = 0;
    
    function mergeAndCountInversions(leftHalf, rightHalf){
      var leftIndex = 0;
      var rightIndex = 0;
      var results = [];
      var halfWithLeftovers;

      while( leftIndex < leftHalf.length && rightIndex < rightHalf.length ){
        // parseInt is used here because I am reading from a text file and need
        // to sort numbers, not strings
        if( parseInt(leftHalf[leftIndex]) < parseInt(rightHalf[rightIndex]) ){
          results.push(leftHalf[leftIndex++]);
        }else{
          results.push(rightHalf[rightIndex++]);
          // Any number on the right hand array has the number of inversions of
          // how many digits are left in the left array
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

  module.exports = mergeSortAndCountInversions;
})();