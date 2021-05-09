//part 1
/*const name;
const lastName;
var age;
var userInfo;*/

//part 2
console.log(test);
var test = 'string'; // undefined, объявление прошло, но вывлеи до присвоения значения 

var x = 'string';
var x = 'string 2';
console.log(x); // string 2, перезаписали переменную

console.log(test2);
let test2 = 'string'; // error, объявили после вывода

const x2 = 'string';
const x2 = 'string 2';
console.log(x2); // error, нельзя константе присвоить новое значение

let num = 12;
let num = 1;
console.log(num); // error, повторное объявление переменной
