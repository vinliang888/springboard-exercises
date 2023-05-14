function findRotationCount(arr) {
    let leftIdx = 0;
    let rightIdx = arr.length - 1;
    if (arr[leftIdx] <= arr[rightIdx]) {
        return 0;
    }

    while (leftIdx <= rightIdx) {
        let midIdx = Math.floor((rightIdx + leftIdx) / 2 );
        if (arr[leftIdx] > arr[leftIdx + 1]) {
            return leftIdx + 1;
        } else if (arr[rightIdx] < arr[rightIdx - 1]) {
            return rightIdx;
        } else if (arr[midIdx] < arr[midIdx - 1]) {
            return midIdx;
        }
        if (arr[midIdx] < arr[leftIdx]) {
            leftIdx += 1;
            rightIdx = midIdx -1;
        } else {
            leftIdx = midIdx + 1;
            rightIdx -= 1;
        }
    }

}

module.exports = findRotationCount