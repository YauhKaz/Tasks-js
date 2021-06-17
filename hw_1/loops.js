//Я Стану Крутым Программистом
let string = 'Я стану крутым программистом';
let stringResult = '';
stringResult += string[0];
for (let i=1; i<string.length; i++) {
    if (string[i-1] === ' ') stringResult += string[i].toUpperCase(); 
    else stringResult += string[i];
}
console.log(stringResult);

//!x
let factorialNumber = 3;
let factorialResult = 1;
for (let i=1; i<=factorialNumber; i++) factorialResult*=i;
console.log(factorialResult);

//Просветление наступит через: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
let string3 = 'Просветление наступит через: ';
let temp = '10';
for (let i = 9; i > 0; i--) {
    temp += `, ${i}`;
}
console.log(string3 + temp);

//odd numbers
for (let i = 1; i < 20; i++) {
    if (i%2 == 1) console.log(i);
}

//ТеперьЯМастерЦикловJavascript
let string5 = 'теперь я мастер циклов javascript';
let stringResult2 = '';
stringResult2 += string5[0].toLocaleUpperCase();
for (let i=1; i<string5.length; i++) {
    if (string5[i] === ' ') {stringResult2 += string5[i+1].toUpperCase(); i++;}
    else stringResult2 += string5[i];
}
console.log(stringResult2);