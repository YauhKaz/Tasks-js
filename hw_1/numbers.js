//Pi
console.log(Math.floor(Math.PI*100) / 100);

//max and min [10,17,5,12,15,99,1]
let arr = [10, 17, 5, 12, 15, 99, 1];
let max = arr[0], min = arr[0];
for (let i=1; i<arr.length; i++) {
    if (arr[i]>max) max=arr[i];
    if (arr[i]<min) min=arr[i];
}
console.log(`max = ${max} and min = ${min}`);

//random
    //part 1
console.log(Math.floor(Math.random()*100) / 100);
    //part 2
console.log(Math.floor(Math.random()*10));

// parseToInt
let string = '100$';
let number = '';
for (let i=0; i<string.length; i++){
    if (!isNaN(Number(string[i]))) number+=string[i];
}
console.log(Number(number));