function findFloor(arr, num) {
    let leftIdx = 0;
    let rightIdx = arr.length - 1;
    if (arr[rightIdx] <= num) {
        return arr[rightIdx];
    } else if (arr[leftIdx] > num) {
        return -1;
    }

    while (leftIdx <= rightIdx) {
        let midIdx = Math.floor((rightIdx + leftIdx) / 2 );
        if (arr[leftIdx] === num || arr[midIdx] === num || arr[rightIdx] === num) {
            return num;
        }

        if (arr[midIdx] < num)  {
            if (arr[midIdx + 1] > num) {
                return arr[midIdx];
            } else {
                leftIdx = midIdx + 1;
            }
        } else {
            rightIdx = midIdx - 1;
        }
    }
}

module.exports = findFloor