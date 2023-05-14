function findRotatedIndex(arr ,num) {

    let leftIdx = 0;
    let rightIdx = arr.length - 1;
    

    while (leftIdx <= rightIdx) {
        let midIdx = Math.floor((rightIdx + leftIdx) / 2 );
        if (arr[midIdx] === num) {
            return midIdx;
        } else if (arr[leftIdx] === num) {
            return leftIdx;
        } else if (arr[rightIdx] === num) {
            return rightIdx;
        }

        if ((arr[midIdx] < arr[leftIdx]) && (num > arr[leftIdx] || num < arr[midIdx]) || (num > arr[leftIdx] && num < arr[midIdx])) {
            leftIdx += 1;
            rightIdx = midIdx - 1;
        } else {
            leftIdx = midIdx + 1;
            rightIdx -= 1;
        }
    }
    return -1;
}

module.exports = findRotatedIndex