function countZeroes(arr) {
  
  let leftIdx = 0;
  let rightIdx = arr.length-1;
  while (leftIdx <= rightIdx) {
    if (arr[leftIdx] === 0) {
        return arr.length - leftIdx;
    }
    if (leftIdx === rightIdx) {
        return 0;
    }
    let midIdx = Math.floor((leftIdx + rightIdx) / 2);
    if (arr[midIdx] === 1) {
        leftIdx = midIdx + 1;
    } else if (arr[midIdx] === 0) {
        if (arr[midIdx-1] === 1) {
            return arr.length - midIdx
        } else rightIdx = midIdx - 1;
    }
  }
  return 0;

}

module.exports = countZeroes