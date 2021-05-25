const signButton = document.querySelector('.authorizationButton');
const userName = document.getElementById('authorizationName');
const clearButton = document.getElementById('clearButton');
const inputItems = document.querySelectorAll('.inputForm__item');
const addButton = document.getElementById('addButton');

let check = [];
let autorizationCheckId = localStorage.getItem('autorizationCheckId');
let newFilm = JSON.parse(localStorage.getItem('newFilm'));
let genres = JSON.parse(localStorage.getItem('genres'));
if (newFilm === null) newFilm = [];

if (autorizationCheckId != 1) document.location.href = "https://discord.com/404";

//log Out
signButton.addEventListener('click', function() {
    if (signButton.textContent === 'Sign Out') {
        signButton.textContent = 'Sign In/Sign Up';
        userName.textContent = '';
        autorizationCheckId = 0;
        localStorage.setItem('autorizationCheckId',autorizationCheckId);
        document.location.href = "/index.html";
    } 
    else {
        localStorage.setItem('usersInformation', JSON.stringify(users))
        document.location.href = "/signInPage.html";
    }    
})

//clear button
clearButton.addEventListener('click', function() {
    inputItems[0].value = 'Title';
    inputItems[1].textContent = 'Overview';
    inputItems[2].value = 'Poster-part';
    inputItems[3].value = 0;
    inputItems[4].value = '2020-05-16';
    inputItems[5].value = 'Genres';
    inputItems[6].value = 0;
    inputItems[7].value = 0;
});

//add button
addButton.addEventListener('click', function() {
    newFilm.push({
        id: newFilm.length,
        title: inputItems[0].value,
        overview: inputItems[1].textContent,
        poster: inputItems[2].value,
        popularity: inputItems[3].value,
        releaseDate: inputItems[4].value,
        genres: inputItems[5].value,
        voteAverage: inputItems[6].value,
        voteCount: inputItems[7].value
    });
    if (checkValidation()) {
        localStorage.setItem('newFilm', JSON.stringify(newFilm));
        document.location.href = "/index.html";
    }
    else alert('please, watch your dates');
    
}); 

//checklist
for (let i=0; i < inputItems.length; i++) {
    inputItems[i].addEventListener('change', function() {
        if (inputItems[0].value.length <= 2) check.title = false;
        else check.title = true;
        if (inputItems[1].value.length <= 3 && inputItems[1].value.length >= 150) check.overview = false;
        else check.overview = true;
        if (!/[^A-Za-z]{1,}/.exec(inputItems[3].value)) check.popularity = false;
        else check.popularity = true;
        if (!/[^A-Za-z]{4}-[^A-Za-z]{2}-[^A-Za-z]{2}/.exec(inputItems[4].value)) check.release = false;
        else check.release = true;
        if (!((Number(inputItems[6].value)>=0 && Number(inputItems[6].value) <= 9)  || Number(inputItems[6].value) === 10)) check.average = false;
        else check.average = true;
        if (!/[^A-Za-z]{1,}/.exec(inputItems[7].value)) check.count = false;
        else check.count = true;
    });
}

//validation
function checkValidation() {
    let k=0;
    console.log(check.title);
    if (!check.title) return false;
    if (check.title && check.overview && check.popularity && check.release
        && check.average && check.count) return true;
    else return false;  
}
