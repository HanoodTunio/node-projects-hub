let arr = [1, 3, 2, 3, 4, 1, 3, 1, 1];

function MostFrequentElementInAnArray(array) {
    const frequencyMap = {};
    let maxElement = array[0];
    let maxCount = 1;

    for (let i = 0, len = array.length; i < len; i++) {
        const element = array[i];
        if (frequencyMap[element])
            frequencyMap[element]++;
        else
            frequencyMap[element] = 1;


        if (frequencyMap[element] > maxCount) {
            maxElement = element;
            maxCount = frequencyMap[element];
        }
    }
    return maxElement;

}

console.log(MostFrequentElementInAnArray(arr));
