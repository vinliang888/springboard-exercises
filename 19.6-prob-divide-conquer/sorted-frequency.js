function sortedFrequency(arr, val) {
    let leftIdx = 0;
    let rightIdx = arr.length-1;
    
    while (leftIdx <= rightIdx) {
        console.log(leftIdx)
        console.log(rightIdx)
        if (arr[leftIdx] === val && arr[rightIdx] === val) {
            return rightIdx - leftIdx + 1;
        }
        let midIdx = Math.floor((leftIdx + rightIdx) / 2);
        if (arr[midIdx] === val) {
            console.log('found middle searching left')
            let searchLeftIdx = 0;
            let searchRightIdx = midIdx - 1;
            while (searchLeftIdx <= searchRightIdx) {
                console.log(`left ${searchLeftIdx} right ${searchRightIdx}`)
                let searchMidIdx = Math.floor((searchLeftIdx + searchRightIdx) / 2);
                if (arr[searchLeftIdx] === val) {
                    leftIdx = searchLeftIdx;
                    console.log('found left')
                    break;
                } else if (arr[searchRightIdx] < val) {
                    leftIdx = searchRightIdx+1;
                    console.log('found left')
                    break;
                }
                if (arr[searchMidIdx] < val) {
                    searchLeftIdx = searchMidIdx + 1;
                } else if (arr[searchMidIdx] === val) {
                    searchRightIdx = searchMidIdx - 1;
                }
            }
            searchLeftIdx = midIdx+1;
            searchRightIdx =  arr.length-1;
            console.log('found middle searhcing right')
            while (searchLeftIdx <= searchRightIdx) {
                console.log(`left ${searchLeftIdx} right ${searchRightIdx}`)
                searchMidIdx = Math.floor((searchLeftIdx + searchRightIdx) / 2);
                if (arr[searchRightIdx] === val) {
                    rightIdx = searchRightIdx;
                    console.log('found right')
                    break;
                } else if (arr[searchLeftIdx] > val) {
                    rightIdx = searchLeftIdx-1;
                    console.log('found right')
                    break;
                }
                if (arr[searchMidIdx] === val) {
                    searchLeftIdx = searchMidIdx + 1;
                } else if (arr[searchMidIdx] > val) {
                    searchRightIdx = searchMidIdx - 1;
                }
            }


        } else if (arr[midIdx] < val) {
            leftIdx = midIdx + 1;
        } else if (arr[midIdx] > val) {
            rightIdx = midIdx - 1;
        }      
    }
    return -1;
}

module.exports = sortedFrequency