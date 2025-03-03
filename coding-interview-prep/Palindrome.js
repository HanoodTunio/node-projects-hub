let str = "maam";

function isPalindrome(str) {
    let reverse = "";

    for (let i = str.length - 1; i >= 0; i--) {
        reverse += str[i];
    }

    return str === reverse;
}
console.log(isPalindrome(str));