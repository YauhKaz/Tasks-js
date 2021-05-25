const filmPageInformation = document.querySelectorAll('.information__item');
const filmPageImage = document.querySelector('.information__image');
const signButton = document.querySelector('.authorizationButton');
const userName = document.getElementById('authorizationName');
const actionImages = document.querySelectorAll('.information__image-none');
const userVote = document.querySelector('.vote__input');
const userVoteValue = document.getElementById('input-vote');
const userVoteOk = document.querySelector('.input__button');
const deleteButton = document.getElementById('deleteButton');
const editButton = document.getElementById('editButton');
const inputItems = document.querySelectorAll('.information__item-input');
const okInputButton = document.getElementById('okInputButton');
const returnInputButton = document.getElementById('returnInputButton');

let filmInformation = JSON.parse(localStorage.getItem('filmInformation'));
let autorizationCheckId = localStorage.getItem('autorizationCheckId');
let users = JSON.parse(localStorage.getItem('usersInformation'));
let deleteFilms = JSON.parse(localStorage.getItem('deleteFilms'));
let filmsVote = JSON.parse(localStorage.getItem('filmsVote'));
let genreList = JSON.parse(localStorage.getItem('genre'));
let editionFilms = JSON.parse(localStorage.getItem('editionFilms'));
let newFilm = JSON.parse(localStorage.getItem('newFilm'));
let k=-1;
if (editionFilms === null)
    {
        editionFilms=[];
    } 


if (filmsVote === null) {
    filmsVote = [];
    filmPageInformation[0].textContent = filmInformation.title;
    filmPageInformation[1].textContent = filmInformation.overview;
    filmPageInformation[2].textContent = loadGenres(filmInformation.genres,genreList);
    filmPageInformation[3].textContent = filmInformation.popularity;
    filmPageInformation[4].textContent = filmInformation.releaseDate;
    filmPageInformation[5].textContent = filmInformation.voteAverage;
    filmPageInformation[6].textContent = filmInformation.voteCount;
    if (`${filmInformation.image}` === 'https://image.tmdb.org/t/p/w500null'){
        filmPageImage.src="/assets/w500null.png"
    }
    else filmPageImage.src = `${filmInformation.image}`;
};

let filmVote = {
    userId: 0,
    filmTitle: 'name',
    userVote: 0,
    filmAverageVote: 0,
    filmCount: 0
}

//load informations
checkUser();
if (k < 0) {
    loadInfo();
}
else {
    loadInfo();
    userVoteValue.value = filmsVote[k].userVote;
}

//admin
if (autorizationCheckId === '1') {
    signButton.textContent = 'Sign Out';
    userName.textContent = users[autorizationCheckId-1].name;
    for (let i=0; i < actionImages.length; i++) {
        actionImages[i].classList.add("information__image-edit");
        actionImages[i].classList.remove("information__image-none");
    }
    //delete click
    deleteButton.addEventListener('click', function() {
        if (deleteFilms === null) {
            deleteFilms = [];
            deleteFilms.push({
                count: filmInformation.count,
                sortKind: filmInformation.sortKind});
            localStorage.setItem('deleteFilms', JSON.stringify(deleteFilms));
            document.location.href = "/index.html";
        }
        else {
            deleteFilms.push({
                count: filmInformation.count,
                sortKind: filmInformation.sortKind});
            localStorage.setItem('deleteFilms', JSON.stringify(deleteFilms));
            document.location.href = "/index.html";
        }
    })
    //edit click
    editButton.addEventListener('click', function() {
        for (let i=0; i < inputItems.length; i++) {
            inputItems[i].classList.remove('information__item-input'); 
        }
        inputItems[0].value = filmPageInformation[0].textContent;
        inputItems[1].textContent = filmPageInformation[1].textContent;
        inputItems[2].value = filmPageInformation[2].textContent;
        inputItems[3].value = filmPageInformation[3].textContent;
        inputItems[4].value = filmPageInformation[4].textContent;
        inputItems[5].value = filmPageInformation[5].textContent;
        inputItems[6].value = filmPageInformation[6].textContent;
        returnInputButton.addEventListener('click', function() {
            inputItems[0].value = filmPageInformation[0].textContent;
            inputItems[1].textContent = filmPageInformation[1].textContent;
            inputItems[2].value = filmPageInformation[2].textContent;
            inputItems[3].value = filmPageInformation[3].textContent;
            inputItems[4].value = filmPageInformation[4].textContent;
            inputItems[5].value = filmPageInformation[5].textContent;
            inputItems[6].value = filmPageInformation[6].textContent;
        });
        okInputButton.addEventListener('click', function(){
            
            let j=0;
            for (let i=0; i < editionFilms.length; i++) {
                if (editionFilms[i].count === filmInformation.count && editionFilms[i].sortKind === filmInformation.sortKind) {
                    editionFilms[i].title = inputItems[0].value;
                    editionFilms[i].overview = inputItems[1].value;
                    editionFilms[i].genres = filmInformation.genres;
                    editionFilms[i].popularity = inputItems[3].value;
                    editionFilms[i].releaseDate = inputItems[4].value;
                    editionFilms[i].voteAverage = inputItems[5].value;
                    editionFilms[i].voteCount = inputItems[6].value;
                    j++;
                }   
            }     
            if (j === 0) editFilm(editionFilms);  
            localStorage.setItem('editionFilms', JSON.stringify(editionFilms));
            document.location.href = "/index.html";
        })        
    })
}
//user
if (autorizationCheckId >'1') {
    signButton.textContent = 'Sign Out';
    userName.textContent = users[autorizationCheckId-1].name;
    userVote.classList.remove('vote__input');
    userVote.classList.add('information__item');
    clickVoteOk();
}

//sign in/out page
signButton.addEventListener('click', function() {
    if (signButton.textContent === 'Sign Out') {
        signButton.textContent = 'Sign In/Sign Up';
        if (userName.textContent === 'admin') {
            for (let i=0; i < deleteButton.length; i++) {
                deleteButton[i].classList.remove("filmsMenu__bascket-image-active");
                deleteButton[i].classList.add("filmsMenu__bascket-image");
            }
        } 
        userName.textContent = '';
        autorizationCheckId = 0;
        localStorage.setItem('autorizationCheckId',autorizationCheckId);
        document.location.href = "/filmpage.html";
    } 
    else {
        localStorage.setItem('usersInformation', JSON.stringify(users));
        document.location.href = "/signInPage.html";
    }    
})

//function clickVoteOk
function clickVoteOk() {
    userVoteOk.addEventListener('click', function() {
        checkUser();
        if (Number(userVoteValue.value)>=0 && Number(userVoteValue.value<=9)) {
            let vote = userVoteValue.value;
            userVoteValue.value = vote;
            if (k < 0) {
                filmVote.userId = autorizationCheckId;
                filmVote.filmTitle = filmInformation.title;
                filmVote.userVote = vote;
                filmVote.filmAverageVote = Math.floor((filmInformation.voteCount*filmInformation.voteAverage 
                                            + Number(vote))/(filmInformation.voteCount+1)*10)/10;
                filmVote.filmCount = Number(filmInformation.voteCount)+1;
                filmPageInformation[6].innerHTML = filmVote.filmCount;
                filmPageInformation[5].innerHTML = filmVote.filmAverageVote;
                filmsVote.push(filmVote);
                localStorage.setItem('filmsVote', JSON.stringify(filmsVote));
            }
            else {
                filmsVote[k].userVote = vote;
                localStorage.setItem('filmsVote', JSON.stringify(filmsVote));
            }
        }
        else {
            alert('please, change your vote');
        }                   
    });
}

//function editFilm
function editFilm(editionFilms) {
    editionFilms.push({
        title: inputItems[0].value,
        overview: inputItems[1].value,
        genres: filmInformation.genres,
        popularity: inputItems[3].value,
        releaseDate: inputItems[4].value,
        voteAverage: inputItems[5].value,
        voteCount: inputItems[6].value,
        count: filmInformation.count,
        sortKind: filmInformation.sortKind
    });
}

//load info
function loadInfo() {
    let j=0;
    if (filmInformation.changedId > 0) {
        filmPageInformation[0].textContent = filmInformation.title;
        filmPageInformation[1].textContent = filmInformation.overview;
        filmPageInformation[2].textContent = loadGenres(filmInformation.genres,genreList);
        filmPageInformation[3].textContent = filmInformation.popularity;
        filmPageInformation[4].textContent = filmInformation.releaseDate;
        filmPageInformation[5].textContent = filmInformation.voteAverage;
        filmPageInformation[6].textContent = filmInformation.voteCount;
        filmPageImage.src = `${filmInformation.image}`;
    }
    else {
        for (let i=0; i < editionFilms.length; i++) {
            if (editionFilms[i].count === filmInformation.count && editionFilms[i].sortKind === filmInformation.sortKind) {
                filmPageInformation[0].textContent = editionFilms[i].title;
                filmPageInformation[1].textContent = editionFilms[i].overview;
                filmPageInformation[2].textContent = loadGenres(editionFilms[i].genres,genreList);
                filmPageInformation[3].textContent = editionFilms[i].popularity;
                filmPageInformation[4].textContent = editionFilms[i].releaseDate;
                filmPageInformation[5].textContent = editionFilms[i].voteAverage;
                filmPageInformation[6].textContent = editionFilms[i].voteCount;
                filmPageImage.src = `${filmInformation.image}`;
                j++;
            }   
        } 
        if (j === 0) {
            filmPageInformation[0].textContent = filmInformation.title;
            filmPageInformation[1].textContent = filmInformation.overview;
            filmPageInformation[2].textContent = loadGenres(filmInformation.genres,genreList);
            filmPageInformation[3].textContent = filmInformation.popularity;
            filmPageInformation[4].textContent = filmInformation.releaseDate;
            filmPageInformation[5].textContent = filmInformation.voteAverage;
            filmPageInformation[6].textContent = filmInformation.voteCount;
            filmPageImage.src = `${filmInformation.image}`;
        }  
    }      
}

//loadGenres function
function loadGenres(genres, genreList) {
    let result = '|';
    for (let i=0; i < genres.length; i++) {
        for (let j=0; j < genreList.length; j++){
            if (genreList[j].id == genres[i]) {
                result+=` ${genreList[j].name} |`;
            } 
        }
    }
    return result;
}

//checkFunction 
function checkUser () {
    k=-1;
    for (let i=0; i < filmsVote.length; i++) {
        if (filmsVote[i].filmTitle === filmInformation.title && filmsVote[i].userId === autorizationCheckId) {
            k = i;
        }
    }
}



