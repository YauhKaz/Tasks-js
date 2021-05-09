//loading page
let tasks=[];
let j=0;
localStorage.getItem(`count`) === null ? j = 0 : j = 1+Number(localStorage.getItem(`count`));
let outputTask = {};
const buttonList = document.querySelectorAll('.submenu__button');
const submenu = document.querySelector('.submenu');
const list = document.querySelector('ul');
const close = document.getElementsByClassName("close");
//create localStorage datas
if (j != 0){
    for (let i=0; i<=localStorage.getItem(`count`);i++) {
        outputTask[i] = {
            id: localStorage.getItem(`id[${[i]}]`) || i,
            value: localStorage.getItem(`tasks[${[i]}]`) || false,
            checked: localStorage.getItem(`tasksChecked[${[i]}]`) || false,
            important: localStorage.getItem(`tasksImportant[${[i]}]`) || false
        };
        if (outputTask[i].id !== 'delete') {
            let li = document.createElement("li");
            li.id = i;
            let text = document.createTextNode(outputTask[i].value);
            let span = document.createElement("span");
            if (outputTask[i].checked === 'true')  span.classList.add('checked');
            else span.classList.remove('checked');
            if (outputTask[i].important === 'true')  li.classList.add('importantOn');
            li.appendChild(span);
            span.appendChild(text);
            document.getElementById("myUL").appendChild(li); 
            let buttonClose = document.createElement("button");
            let buttonImportant = document.createElement("button");
            let buttonName = '';
            li.classList.contains('importantOn') === true ? buttonName = document.createTextNode("NOT IMPORTANT") : buttonName = document.createTextNode("MARK IMPORTANT");
            buttonImportant.className = "important";
            buttonClose.className = "close";
            if (outputTask[i].important === 'true') buttonImportant.classList.add('importantButton');
            li.appendChild(buttonImportant);
            buttonImportant.appendChild(buttonName);
            li.appendChild(buttonClose);
        }        
    }
}

//create new element
function newElement() {
    let li = document.createElement("li");
    let inputValue = document.getElementById("inputValue").value;
    localStorage.setItem(`tasks[${j}]`,inputValue);
    li.id = j;    
    let text = document.createTextNode(inputValue);
    let span = document.createElement("span");    
    li.appendChild(span);
    span.appendChild(text);
    // check textarea
    if (inputValue === '') {
        alert("You must write smth!");
    }
    else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("inputValue").value = "";

    //create output buttons
    let buttonClose = document.createElement("button");
    let buttonImportant = document.createElement("button");
    let buttonName = document.createTextNode("MARK IMPORTANT");
    buttonImportant.className = "important";
    buttonClose.className = "close";
    li.appendChild(buttonImportant);
    buttonImportant.appendChild(buttonName);
    li.appendChild(buttonClose);

    //check done menu
    if (document.getElementById("myUL").parentElement.childNodes[3].childNodes[1].childNodes[5].classList.contains('activeSubmenuButton') === true) {
        li.style.display = "none";
    }
    

    //delete function
    for (let i=0; i<close.length; i++) {
        close[i].onclick = function(e) {
            localStorage.setItem(`id[${e.target.parentElement.id}]`, 'delete');
            e.target.parentElement.classList.add('delete');
        }
    }
    localStorage.setItem("count",j);
    j++;    
}

//checked task
list.addEventListener('click', function(e) {
    let idTemp = 1;
    if (e.target.tagName === 'LI') {
        idTemp = e.target.id;
        e.target.firstChild.classList.toggle('checked');
        e.target.firstChild.classList.contains('checked') ? localStorage.setItem(`tasksChecked[${idTemp}]`, true) : localStorage.setItem(`tasksChecked[${idTemp}]`, false);
    }
    if (e.target.tagName === 'SPAN') {  
        idTemp = e.target.parentElement.id;  
        e.target.classList.toggle('checked');
        e.target.classList.contains('checked') ? localStorage.setItem(`tasksChecked[${idTemp}]`, true) : localStorage.setItem(`tasksChecked[${idTemp}]`, false);
    }
}, false);

//important task
list.addEventListener('click', function(e) {
    let idTemp = 1;
    if (e.target.classList.contains('important')) {
        idTemp = e.target.parentElement.id;
        e.target.parentElement.classList.toggle('importantOn');
        e.target.textContent = e.target.textContent === "MARK IMPORTANT" ? "NOT IMPORTANT" : "MARK IMPORTANT";
        e.target.classList.toggle('importantButton');
        e.target.textContent !== "MARK IMPORTANT" ? localStorage.setItem(`tasksImportant[${idTemp}]`, true) : localStorage.setItem(`tasksImportant[${idTemp}]`, false);
    }
}, false);


//delete task
for (let i=0; i<close.length; i++) {
    close[i].onclick = function(e) {
        localStorage.setItem(`id[${e.target.parentElement.id}]`, 'delete');
        e.target.parentElement.classList.add('delete');
    }
}


// filter menu
submenu.addEventListener('click', function(e) {
    //change status
    for (let i=0; i<buttonList.length; i++) {
        if (buttonList[i] === e.target) {
            e.target.classList.add('activeSubmenuButton');
        }
        else buttonList[i].classList.remove('activeSubmenuButton');
    }

    //filter work
    let liList = document.querySelectorAll('li');
    if (liList) {        
        for (let i=0; i<list.childNodes.length; i++) {
            if (!list.childNodes[i].classList.contains('delete')) {
                list.childNodes[i].style.display = "flex";
            }
        }       
        if (e.target.textContent === 'All') {
            for (let i=0; i<liList.length;i++) {
                liList[i].style.display = "flex";   
            } 
        }
        if (e.target.textContent === 'Active') {
            for (let i=0; i<liList.length;i++) {
                if (liList[i].firstChild.classList.contains('checked')) {
                    liList[i].style.display = "none";
                }    
            } 
        }   
        if (e.target.textContent === 'Done') {
            for (let i=0; i<liList.length;i++) {
                if (!liList[i].firstChild.classList.contains('checked')) {
                    liList[i].style.display = "none";
                }    
            } 
        }      
    }
}, false);


