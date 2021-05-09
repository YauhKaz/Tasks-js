document.addEventListener('DOMContentLoaded', function () {
    console.clear();
    // ваш код поместить тут

    function isParent(parent, child) {
        for (let i=0; i<document.getElementsByTagName(`${parent}`).length; i++)
        {
            for (let k=0; k<document.getElementsByTagName(`${parent}`)[i].childNodes.length; k++)
            if (document.getElementsByTagName(`${parent}`)[i].childNodes[k] == document.getElementsByTagName(`${child}`)[0]) return true;
        }
        return false;
    }
    console.log(isParent('body', 'div'));

    let ulPreviousSibling = document.querySelector('ul').previousElementSibling;
    console.log(ulPreviousSibling);

    let pTextData = document.querySelector('p').innerText;
    console.log(pTextData);

    function returnDiscrabeObject(node) {
        let discrabeNode = document.querySelector(node);
        let discrabeObject = {
            type: discrabeNode.nodeType,
            name: discrabeNode.nodeName,
            count: discrabeNode.childNodes.length
        }  
        return discrabeObject;
    }
    console.log(returnDiscrabeObject('body'));

    document.querySelector('ul').classList.add("list");
  });