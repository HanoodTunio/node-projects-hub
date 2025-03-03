function divisibleBySeven(num) {
    if (num % 7 === 0) {
        return true;
    }
    else
        return false;
}

console.log(divisibleBySeven(45));
console.log(divisibleBySeven(21));
console.log(divisibleBySeven(14));
console.log(divisibleBySeven(28));