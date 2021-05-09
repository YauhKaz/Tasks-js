// short-size
//let a = a + 5;
let a; a += 5;
//let b = b * 15;
let b; b *= 15;
//let c = c - 3;
let c; c -= 3;
//let d = d % 2;
let d; d %= 2;
//let k = a + k;
let k; k += a;
//let l = l * b;
let l; l *= b;
//let m = m * 3 * k;
let m; m *= 3 * k;

//x^3
let x; x *= x * x;

//big and small
let string = '';
if (string == 'мальнький') string = 'большой';
    else string = 'маленький';
string = (string == 'маленький') ? 'большой' : 'маленький';

//0<x && x>1
let x3 = -10;
if (x3 < 0) x3 = 'меньше нуля';
else if (x3 == 0) x3 = 1;
else if (x3 > 0) x3*=10;
//x3 = (x3 < 0) ? 'меньше нуля' : ((x3 == 0) ? 1 : x3*10);
console.log(x3);

//switch
let x4 = 'про';
switch(x4) {
    case 'котик': {console.log('котик');break;}
    case 'собака': {console.log('собака');break;}
    case 'хомячок': {console.log('хомячок');break;}
    default: {console.log('неизвестное науке животное');break;}
}

//
let x5 = 0 || 'строка'; //'строка'
let x6 = 1 && 'строка'; //'строка'
let x7 = null || 1; //1
let x8 = null && 1; //null
let x9 = 1 && null; //null
let x10 = null || 0 || 1; //1
let x11 = null && 0 && 1; //null

//
let x12 = 1 + 2 + '3'; //33 
let x13 = 1 + 2 - '1'; //2
let x14 = '1' + 2 - 1; //11
let x15 = true + 1; //2
let x16 = +'1' + 2; //3
let x17 = null + 2; //2
let x18 = undefined + 2; //NaN
let x19 = true + undefined; //NaN