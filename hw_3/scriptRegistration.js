const inputs = document.querySelectorAll('.registrationForm__input');
const cleanButton = document.querySelector('.clear-button');
const signUpButton = document.querySelector('.signUp-button');

let users = JSON.parse(localStorage.getItem('usersInformation'));
let id = users[users.length-1].id;
let check = [];
let newUser = {
    id: id,
    name: 'name',
    password: 'password',
    email: 'your@mail'
};

for (let i=0; i < inputs.length; i++) {
    inputs[i].addEventListener('click', function(e) {
        e.target.value = "";
    })
}

//cleanButton
cleanButton.addEventListener('click', function() {
    for (let i=0; i < inputs.length; i++) {
        inputs[i].value = '';
    }    
})

//registrationButton
signUpButton.addEventListener('click', function() {
    let emailError = 0;
    for (let i=0; i < users.length; i++) {
        if (inputs[4].value == users[i].email) {
            emailError++;
        }
    }  
    if (inputs[2].value == inputs[3].value && emailError == 0) {
        id++;
        newUser = {
            id: id,
            name: inputs[0].value,
            password: inputs[2].value,
            email: inputs[4].value
        }
        if (checkValidation()) {
            users.push(newUser);
            localStorage.setItem('usersInformation', JSON.stringify(users));
            document.location.href = "/signInPage.html";
        }        
        else alert('please, watch your dates');
    }
    else if (inputs[2].value != inputs[3].value) {
        alert('confirm password wrong');
    } 
    else alert('this email was registrated');
})

for (let i=0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', function() {
        if (inputs[0].value.length <= 2) check.name = false;
        else check.name = true;
        if (inputs[1].value.length <= 3 && inputs[1].value.length >= 20) check.surname = false;
        else check.surname = true;
        if (!/[A-Za-z0-9]{1,}/.exec(inputs[2].value)) check.password = false;
        else check.password = true;
        if (!/[A-Za-z0-9]{1,}/.exec(inputs[3].value)) check.passwordRepite = false;
        else check.passwordRepite = true;
        if (!/[A-Za-z0-9]{1,}@[A-Za-z0-9]{1,}/.exec(inputs[4].value)) check.mail = false;
        else check.mail = true;
    });
}

//validation
function checkValidation() {
    if (!check.name) return false;
    if (check.name && check.surname && check.password && check.passwordRepite
        && check.mail) return true;
    else return false;  
}