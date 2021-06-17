const signButton = document.querySelector('.signButton');
const regisrationButton = document.querySelector('.registrationButton');
const email = document.querySelector('.signMail');
const password = document.querySelector('.signPassword');

let usersData = JSON.parse(localStorage.getItem('usersInformation'));
console.log(usersData);


regisrationButton.addEventListener('click', function() {
    document.location.href = "/registrationPage.html";
})

signButton.addEventListener('click', function() {
    let count = 0;
    for(let i=0; i<usersData.length; i++) {
        if (email.value === usersData[i].email && password.value === usersData[i].password) {
            localStorage.setItem('autorizationCheckId', usersData[i].id);
            count++;
            document.location.href = "/index.html";   
        };
    }
    if (count === 0) alert('User has not registered');
})