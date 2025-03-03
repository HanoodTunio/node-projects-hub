const str = "Hello this is me Hanood";

function reverseWord(str, wordToReverse) {
    let words = str.split(' ');
    let reverse = '';

    for (let i = 0; i < words.length; i++) {
        if (words[i] === wordToReverse) {
            for (let i = wordToReverse.length - 1; i >= 0; i--) {
                reverse += wordToReverse[i];
            }
            words[i] = reverse;
        }
    }
    return words.join(' ');
}

console.log(reverseWord(str, "me")); // Output: "Hello this is eM Hanood"