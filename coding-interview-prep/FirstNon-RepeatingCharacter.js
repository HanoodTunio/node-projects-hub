function nonRepeatingFirst(str) {
    let charCount = {};

    // Step 1: Count occurrences of each character
    for (let char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    // Step 2: Find the first non-repeating character
    for (let char of str) {
        if (charCount[char] === 1) {
            return char;
        }
    }

    return null; // Return null if no unique character is found
}

console.log(nonRepeatingFirst("JavaScript")); // "J"
console.log(nonRepeatingFirst("leetcode"));   // "l"
console.log(nonRepeatingFirst("swiss"));      // "w"
console.log(nonRepeatingFirst("racecar"));    // "e"
