let string = 'string test example';
let newString = '';

//first and last character
console.log(string[0] + " " + string[string.length-1]);

//toUpperCase()
newString = string[0].toUpperCase() + string.substr(1,string.length-2) + string[string.length-1].toUpperCase();
console.log(newString);

//indexOf(substr,pos)
console.log(string.indexOf('string',0));


//indexOf(' ',pos); second ' '
let pos = [];
let j=0;
for (let i=0; i<string.length; i++) {
    if (string[i] === ' ') {
        pos[j] = i;
        j++;
    }
}
console.log(pos[1]);

//substr(start,length)
console.log(string.substr(1,6));

//slice(start,end)
console.log(string.slice(0,7));

//concat
let x=20;
let y=21;
console.log(x.toString()+y.toString());