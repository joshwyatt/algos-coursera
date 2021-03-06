;(function(){

  function mergeSortByXorY(array, sortByXorY){
    
    function merge(leftHalf, rightHalf, sortByXorY){
      var leftIndex = 0;
      var rightIndex = 0;
      var results = [];
      var xOrY, halfWithLeftovers;

      if( sortByXorY === 'x' ){
        xOrY = 0;
      }else{
        xOrY = 1;
      }

      while( leftIndex < leftHalf.length && rightIndex < rightHalf.length ){

        if( leftHalf[leftIndex][xOrY] < rightHalf[rightIndex][xOrY] ){
          results.push(leftHalf[leftIndex++]);
        }else{
          results.push(rightHalf[rightIndex++]);
        }

      }

      if( leftIndex === leftHalf.length ){
        halfWithLeftovers = rightHalf.slice(rightIndex);
      }else{
        halfWithLeftovers = leftHalf.slice(leftIndex);
      }

      return results.concat(halfWithLeftovers);
    }

    if( array.length <= 1 ) return array;

    var centerIndex, leftHalf, rightHalf, sortedLeftHalf, sortedRightHalf;

    //split array into 2 halves
    centerIndex = Math.ceil(array.length / 2);
    leftHalf = array.slice(0, centerIndex);
    rightHalf = array.slice(centerIndex);

    sortedLeftHalf = mergeSortByXorY(leftHalf, sortByXorY);
    sortedRightHalf = mergeSortByXorY(rightHalf, sortByXorY);

    return merge(sortedLeftHalf, sortedRightHalf, sortByXorY);
  }

  module.exports = mergeSortByXorY;

})();
