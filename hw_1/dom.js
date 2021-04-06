let head = document.getElementsByTagName("head");
console.log(head);

let body = document.getElementsByTagName("body");
console.log(body);

let childrenBody = document.body.childNodes;
console.log(childrenBody);

let firstChildrenBody = document.body.getElementsByTagName("div")[0].childNodes;
console.log(firstChildrenBody);

let childrenDivWithoutFurst = [];
for (let i=1; i<document.body.getElementsByTagName("div")[0].childNodes.length; i++)
childrenDivWithoutFurst[i-1] = document.body.getElementsByTagName("div")[0].childNodes[i];
console.log(childrenDivWithoutFurst);