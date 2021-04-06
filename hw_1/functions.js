//multiply
function multiplyNumbers() {
    if (arguments === null) return 0;
    let sum=1;
    for (let i=0; i<arguments.length; i++)
        sum*=arguments[i];
    return sum;
}
console.log(multiplyNumbers(1,2,3,4));

//factorial
function factorialNumbers(number) {
    if (number == 0) return 1;
    if (number-1 == 0) return number;
    else {return number*factorialNumbers(number-1);}
}
console.log(factorialNumbers(10));

//reverse
function reverseString(str) {
    return str.split('').reverse().join('');
}
console.log(reverseString('test'));

//palindrom
function isPolindromString(str) {
    let tempStr =  reverseString(str);
    if (tempStr == str) return true;
    else return false;
}
console.log(isPolindromString('popopop'));

//change 'symbol' -> number
function changeString(str) {
    let tempStr='';
    tempStr+=str.charCodeAt(0);
    for (let i=1; i<str.length; i++) {
        tempStr+=' ' + str.charCodeAt(i);
    }
    return tempStr;
}
console.log(changeString('hello'));

//test recursion
function writeChar(str) {
    if (str.length === 0) {
        return str;
    }
    else { 
        return `${writeChar(str.substring(0, str.length - 1))}'${str[str.length - 1].split()}'`;}
}
console.log(writeChar('test'));

//names of arrays
function returnString(arr, callback) {    
}
function processEveryElement(elements) {
    
}