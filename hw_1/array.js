let arr = [1,3,6];

// last symbol
function lastElement(arr) {
    console.log(arr[arr.length-1]);
}
lastElement(arr);

//dublicate
function dublicateElement(arr) {
    let temp = arr.length;
    for (let i=0; i<temp; i++)
    arr[temp+i] = arr[i];
    console.log(arr);
}
dublicateElement(arr);

//1..n
let number = 5;
let arrNumbers = [];
function numbersUntil(number) {
    for (let i=1; i<=number; i++)
    arrNumbers[i-1] = i;
    return arrNumbers;
}
console.log(numbersUntil(number));

//two-dimensional array
let twoDimArr = [[1, 2, 3], ["x", "y", "z"]];
let twoDimArrResult = [];
function deleteFirstElement(twoDimArr) {
    for (let i=0; i<twoDimArr.length; i++)
    { 
        twoDimArrResult[i] = [];
        for (let j=0; j<twoDimArr[i].length-1; j++)
        {
            twoDimArrResult[i][j] = twoDimArr[i][j+1];
        }
    }
    return(twoDimArrResult);
}
console.log(deleteFirstElement(twoDimArr));

//letters sort 
let lettersString = 'екважбигёзд';
function sortLetters(lettersString) {
    let collator = new Intl.Collator();
    if (typeof(lettersString) === 'string') return lettersString.split('').sort( (a,b) => collator.compare(a,b)).reverse().join('');
    else return lettersString.sort( (a,b) => collator.compare(a,b)).reverse().join('');
/*    let temp;
    let lettersStringArr = [];
    for (let i=0; i<lettersString.length; i++)
    lettersStringArr[i] = lettersString[i];
    for (let i=0; i<lettersString.length; i++)
        for (let j=1; j<lettersString.length; j++ ){
            if (lettersStringArr[j] > lettersStringArr[j-1]) {
                temp = lettersStringArr[j];
                lettersStringArr[j] = lettersStringArr[j-1];
                lettersStringArr[j-1] = temp;
            }
        }        
    if (typeof(lettersString) === 'string') {
        let lettersStringResult='';
        for (let i=0; i<lettersStringArr.length; i++)
          lettersStringResult += lettersStringArr[i];
        return lettersStringResult;
    }
    else return lettersStringArr;*/    
}
console.log(sortLetters(lettersString));

//sort [5, 2, -1, 6, 9, -9, 3]
let lettersString2 = [5, 2, -1, 6, 9, -9, 3];
console.log(sortLetters(lettersString2));

//3 elements
let arrElements = ['а', 'б', 'в', 'г', 'д', 'е'];
console.log(getNewArray(arrElements,1,3));
function getNewArray(arr, startNumber, endNumber) {
    return arr.slice(startNumber, endNumber+1);
}

//double array
console.log(concatArray(arrElements));
function concatArray (arr) {
    return arr.concat(arr);
}

//delete 3,4
arrNumbers = [1, 2, 3, 4, 5];
arrNumbers.splice(1,2);
console.log(arrNumbers);

//+ 'три' + 'четыре'
arrNumbers = [1, 2, 3, 4, 5];
arrNumbers.splice(1,2,'три', 'четыре');
console.log(arrNumbers);

//add 1 element
arrNumbers = [1, 2, 3, 4, 5];
arrNumbers.splice(2,0,8);
console.log(arrNumbers);

//sort array
let arrArray = [[1, 2, 3], ["x", "y", "x", "y"],[1, 2, 3, 6, 8], ["x"]];
let tempArray = arrArray;
console.log(tempArray.sort(function(a,b){
    return a.length - b.length;
}));

// sort objects
let arrObject = [   {kind: "tarantula", info: {legs: 8, eyes: 8}}, 
                    {kind: "french bulldog", info: {legs: 4, eyes: 2}}, 
                    {kind: "human", info: {legs: 2, eyes: 2}}, 
                    {kind: "lobster", info: {legs: 10, eyes: 2}}];
console.log(arrObject.sort(function(a,b){
    return a.info.legs - b.info.legs;
}));

//service
const services = [  {service: "service1", executionTime: 56}, 
                    {service: "service2", executionTime: 97}, 
                    {service: "service3", executionTime: 23}, 
                    {service: "service4", executionTime: 65}, 
                    {service: "service5", executionTime: 2}, 
                    {service: "service6", executionTime: 73}, 
                    {service: "service7", executionTime: 82}, 
                    {service: "service8", executionTime: 19}, 
                    {service: "service9", executionTime: 33}, 
                    {service: "service10", executionTime: 42}, 
                ]
function filterService(arr,startNumber, endNumber) {
    return arr.sort( (a,b) => a.executionTime - b.executionTime)
            .filter(arrService => arrService.executionTime < endNumber - startNumber);
};
console.log(filterService(services,20,60));


