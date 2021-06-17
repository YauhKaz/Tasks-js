//DOM
const images = document.querySelectorAll(".filmsMenu__filmCard-image");
const vote_ratings = document.querySelectorAll(".vote_rating");
const release_dates = document.querySelectorAll(".release_date");
const select = document.querySelector('select');
const paginationButton = document.querySelectorAll('.paginationButton');
const firstPaginationSpan = document.querySelector('.paginationMenu__firstPaginationSpan');
const lastPaginationSpan = document.querySelector('.paginationMenu__lastPaginationSpan');
const choiseSelect = document.querySelector('select');
const choiseFilm = document.querySelectorAll('.filmCard');
const signButton = document.querySelector('.authorizationButton');
const userName = document.getElementById('authorizationName');
const buscketImage = document.querySelectorAll('.filmsMenu__bascket-image');
const addFilmButton = document.querySelector('.selectMenu__newFilm');
const wrappers = document.querySelectorAll('.filmCard__wrapper');
//variables
let filmInformation = {
    count: 0,
    sortKind: 'sort',
    title: 'title',
    overview: 'overview',
    genres: 'genres',
    popularity: 'popularity',
    releaseDate: 'release-date',
    voteAverage: 'vote_average',
    voteCount: 'vote_count',
    image: '/assets/no_image.png',
    changedId: -1
};
let page = 1;
let id=1;
let newUser = {
    id: id,
    name: 'name',
    password: 'password',
    email: 'your@mail'
};
let users = [{
    id: id,
    name: 'name',
    password: 'password',
    email: 'your@mail'
}];
let Film = {
    count: 0,
    sortKind: 'sort_by'
};
let deleteFilms = JSON.parse(localStorage.getItem('deleteFilms'));
let editionFilms = JSON.parse(localStorage.getItem('editionFilms'));
let filmsVote = JSON.parse(localStorage.getItem('filmsVote'));
//let j = 0;
//load first page
let requestURL = "https://api.themoviedb.org/3/discover/movie?api_key=f548b682cf24c37f64f1d20d7fca99e9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
let sort_by = "popularity.desc";
let autorizationCheckId = localStorage.getItem('autorizationCheckId');
let genre = [];
let newFilm = JSON.parse(localStorage.getItem('newFilm'));

//load start page
loadPage(requestURL,sort_by,page);

//create admin
users[0].id = id;
users[0].name = 'admin';
users[0].password = 'admin';
users[0].email = 'admin@admin';
id++;
//create first user
newUser.id = id;
newUser.name = 'Ivan';
newUser.password = '123';
newUser.email = 'Ivan@ivan.ru';
users.push(newUser);
id++;
if (localStorage.usersInformation === null) localStorage.setItem('usersInformation', JSON.stringify(users));

function loadPage(requestURL,sort_by,page){
    requestURL = `https://api.themoviedb.org/3/discover/movie?api_key=f548b682cf24c37f64f1d20d7fca99e9&language=en-US&sort_by=${sort_by}&include_adult=false&include_video=false&page=${page}`;
    fetch(requestURL)
    .then(function(response) { 
        if (response.status !== 200) {  
            alert('Status Code: ' + response.status);  
            return;  
        }
        return response.json(); 
    })
    .then(function(data) {
        for(let i=0; i < images.length; i++) {
            images[i].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;  
            if (data.results[/*j*filmOnPage+*/i].poster_path != null) images[i].src = `https://image.tmdb.org/t/p/w500${data.results[/*j*filmOnPage+*/i].poster_path}`;
            else images[i].src = '/assets/w500null.png';  
            release_dates[i].textContent = `Data release: ${data.results[i].release_date}`;
            vote_ratings[i].textContent = `Vote rating: ${data.results[i].vote_average}`;
        }
    })
    .then(function() {
        if (deleteFilms != null) {
            deleteFilmOnPage();  
        }
        if (editionFilms != null) {
            editFilmOnPage();
        } 
    })
    .then(function(){
       if (choiseSelect.value === 'None') setNewFilm();
    })
}

//loadFilm function
//let filmOnPage = 20;
function loadFilms(/*j,*/data) {
    for(let i=0; i < images.length; i++) {
        if (data.results[/*j*filmOnPage+*/i].poster_path != null) images[i].src = `https://image.tmdb.org/t/p/w500${data.results[/*j*filmOnPage+*/i].poster_path}`;
        else images[i].src = '/assets/w500null.png'; 
        release_dates[i].textContent = `Data release: ${data.results[/*j*filmOnPage*/+i].release_date}`;
        vote_ratings[i].textContent = `Vote rating: ${data.results[/*j*filmOnPage*/+i].vote_average}`;
    }
}                        

//load pages
for (let i=0; i < paginationButton.length; i++){
    paginationButton[i].addEventListener('click', function(e) {
        page = paginationButton[i].textContent;//Math.trunc((paginationButton[i].textContent-0.1)/2)+1;
        changeButton(e.target.id,e.target.textContent);
        requestURL = `https://api.themoviedb.org/3/discover/movie?api_key=f548b682cf24c37f64f1d20d7fca99e9&language=en-US&sort_by=${sort_by}&include_adult=false&include_video=false&page=${page}`;
        fetch(requestURL)
        .then(function(response) { return response.json(); })
        .then(function(data) {
            loadFilms(data);
            /*if (paginationButton[i].textContent%2 === 0) {
                j=1;
                loadFilms(j,data);
            }
            else {
                j=0;
                loadFilms(j,data);
            }*/
        })
        .then(function() { 
            if (deleteFilms != null) {
                deleteFilmOnPage();  
            }    
            if (editionFilms != null) {
                editFilmOnPage();
            }                  
        }) 
        .then(function(){
            if (choiseSelect.value === 'None') setNewFilm();
        })               
    });
}

//pagination button change
function changeButton(target, content) {
    switch(target) {
        case "firstButton": {
            paginationButton[0].classList.add('activePaginationButton');
            for (let i=1; i<paginationButton.length; i++)
                {
                    paginationButton[i].classList.remove('activePaginationButton');                      
                }
            for (let i=1; i<paginationButton.length-1; i++)
                {
                    paginationButton[i].textContent = i+1;
                }
                firstPaginationSpan.classList.remove('paginationMenu__lastPaginationSpan');
                firstPaginationSpan.classList.add('paginationMenu__firstPaginationSpan');
                lastPaginationSpan.classList.remove('paginationMenu__firstPaginationSpan');
                lastPaginationSpan.classList.add('paginationMenu__lastPaginationSpan');
            break;
        }
        case "secondButton": {
            if (content !== '2') {
                for (let i=1; i<paginationButton.length-1; i++)
                {
                    paginationButton[i].textContent = Number(paginationButton[i].textContent)-1;
                }
            };    
            if (content === '2') {
                paginationButton[1].classList.add('activePaginationButton');
                for (let i=0; i<paginationButton.length; i++)
                {
                    if (i != 1) paginationButton[i].classList.remove('activePaginationButton');
                }
            }   
            else if (content <= 12)  {
                paginationButton[2].classList.add('activePaginationButton');
                for (let i=0; i<paginationButton.length; i++)
                {
                    if (i != 2) paginationButton[i].classList.remove('activePaginationButton');
                }
            }       
            if (content <= 12) {                
                lastPaginationSpan.classList.add('paginationMenu__lastPaginationSpan');
                lastPaginationSpan.classList.remove('paginationMenu__firstPaginationSpan');                
            };
            if (content <= 3) {
                firstPaginationSpan.classList.remove('paginationMenu__lasrPaginationSpan');
                firstPaginationSpan.classList.add('paginationMenu__firstPaginationSpan');                
            };   
            break;
        }
        case "thirdButton": {
            if (content >= 3 && content <=13) {
                paginationButton[2].classList.add('activePaginationButton');
                for (let i=0; i<paginationButton.length; i++)
                {
                    if (i != 2) paginationButton[i].classList.remove('activePaginationButton');
                }
            }
            break;
        }
        case "fourthButton": {
            if (content !== '14') {
                for (let i=1; i<paginationButton.length-1; i++)
                {
                    paginationButton[i].textContent = Number(paginationButton[i].textContent)+1;
                }
            };   
            if (content === '14') {
                paginationButton[3].classList.add('activePaginationButton');
                for (let i=0; i<paginationButton.length; i++)
                {
                    if (i != 3) paginationButton[i].classList.remove('activePaginationButton');
                }
            }
            else if (content > 3) {
                paginationButton[2].classList.add('activePaginationButton');
                for (let i=0; i<paginationButton.length; i++)
                {
                    if (i != 2) paginationButton[i].classList.remove('activePaginationButton');
                }
            }
            if (content >= 13) {
                lastPaginationSpan.classList.add('paginationMenu__firstPaginationSpan');
                lastPaginationSpan.classList.remove('paginationMenu__lastPaginationSpan');                
            };
            if (content > 3) {                
                firstPaginationSpan.classList.remove('paginationMenu__firstPaginationSpan');
                firstPaginationSpan.classList.add('paginationMenu__lastPaginationSpan');                
            };         
            break;
        }
        case "lastButton": {
            paginationButton[4].classList.add('activePaginationButton');
            for (let i=0; i<paginationButton.length-1; i++)
                {
                    paginationButton[i].classList.remove('activePaginationButton');                      
                }
            for (let i=1; i<paginationButton.length-1; i++)
            {
                paginationButton[i].textContent = i+11;
            };
            lastPaginationSpan.classList.remove('paginationMenu__lastPaginationSpan');
            lastPaginationSpan.classList.add('paginationMenu__firstPaginationSpan');
            firstPaginationSpan.classList.remove('paginationMenu__firstPaginationSpan');
            firstPaginationSpan.classList.add('paginationMenu__lastPaginationSpan');            
            break;
        }
    }
}

//select menu
choiseSelect.addEventListener('change', function(e) {
    let currentValue = e.target.value;
    switch(currentValue) {
        case 'None': {
            sort_by = "popularity.desc";
            loadPage(requestURL, sort_by, page);
            break;
        }
        case 'Vote_rating_a': {
            sort_by = "vote_average.asc";
            loadPage(requestURL, sort_by, page);
            break;
        }
        case 'Vote_rating_d': {
            sort_by = "vote_average.desc";
            loadPage(requestURL, sort_by, page);
            break;
        }
        case 'Release_date_a': {
            sort_by = "release_date.asc";
            loadPage(requestURL, sort_by, page);
            break;
        }
        case 'Release_date_d': {
            sort_by = "release_date.desc";
            loadPage(requestURL, sort_by, page);
            break;
        }
    }
})


//film page
for (let i=0; i < choiseFilm.length; i++) {
    choiseFilm[i].addEventListener('click', function() {
        requestURL = `https://api.themoviedb.org/3/discover/movie?api_key=f548b682cf24c37f64f1d20d7fca99e9&language=en-US&sort_by=${sort_by}&include_adult=false&include_video=false&page=${page}`;    
        fetch(requestURL)
        .then(function(response) { return response.json(); })
        .then(function(data) {            
            if (choiseFilm[i].classList.contains('deleteFilm') != true  && newFilm != null && newFilm[i] != null && choiseSelect.value === 'None') {
                filmInformation.count = 20*(page-1) + i;
                filmInformation.sortKind = sort_by;
                filmInformation.title = newFilm[i].title;
                filmInformation.overview = newFilm[i].overview;
                filmInformation.genres = newFilm[i].genres;
                filmInformation.popularity = newFilm[i].popularity;
                filmInformation.releaseDate = newFilm[i].releaseDate;
                filmInformation.voteAverage = newFilm[i].voteAverage;
                filmInformation.voteCount = newFilm[i].voteCount;
                filmInformation.image = newFilm[i].poster;
                filmInformation.changedId = i;
            }
            else {
                filmInformation.count = 20*(page-1) + i;
                filmInformation.sortKind = sort_by;
                filmInformation.title = data.results[/*j*filmOnPage+*/i].title;
                filmInformation.overview = data.results[/*j*filmOnPage+*/i].overview;
                filmInformation.genres = data.results[/*j*filmOnPage+*/i].genre_ids;
                filmInformation.popularity = data.results[/*j*filmOnPage+*/i].popularity;
                filmInformation.releaseDate = data.results[/*j*filmOnPage+*/i].release_date;
                filmInformation.voteAverage = data.results[/*j*filmOnPage+*/i].vote_average;
                filmInformation.voteCount = data.results[/*j*filmOnPage+*/i].vote_count;
                if (data.results[/*j*filmOnPage+*/i].poster_path != null) filmInformation.image = `https://image.tmdb.org/t/p/w500${data.results[/*j*filmOnPage+*/i].poster_path}`;
                else filmInformation.image = '/assets/w500null.png';
            }            
            localStorage.setItem('filmInformation', JSON.stringify(filmInformation));
        })  
        .then(function() {
            document.location.href = "/filmpage.html";
        })        
    })
}

//sign in/out page
signButton.addEventListener('click', function() {
    if (signButton.textContent === 'Sign Out') {
        if (userName.textContent === 'admin') {
            for (let i=0; i < buscketImage.length; i++) {
                buscketImage[i].classList.remove("filmsMenu__bascket-image-active");
                buscketImage[i].classList.add("filmsMenu__bascket-image");
            }
        } 
        userName.textContent = '';
        autorizationCheckId = 0;
        localStorage.setItem('autorizationCheckId',autorizationCheckId);
        localStorage.setItem('usersInformation', JSON.stringify(users));
        document.location.href = "/index.html";
    } 
    else {
        localStorage.setItem('usersInformation', JSON.stringify(users));
        document.location.href = "/signInPage.html";
    }    
})

//admin&users capabilities
//admin
if (autorizationCheckId === '1') {
    signButton.textContent = 'Sign Out';
    users = JSON.parse(localStorage.getItem('usersInformation'));
    userName.textContent = users[autorizationCheckId-1].name;
    addFilmButton.classList.add('selectMenu__newFilm-active');
    addFilmButton.classList.remove('selectMenu__newFilm');
    let k = [];
    for (let i=0; i < buscketImage.length; i++) {
        buscketImage[i].classList.add("filmsMenu__bascket-image-active");
        buscketImage[i].classList.remove("filmsMenu__bascket-image");
        buscketImage[i].addEventListener('click', function(e) {
            //e.target.parentElement.classList.add('deleteFilm');
            //localStorage.setItem('deleteFilms', JSON.stringify(deleteFilms));
            console.log(i);
            if (deleteFilms === null) {
                deleteFilms = [];
                deleteFilms.push({
                    count: 20*(page-1) + i,
                    sortKind: sort_by});
                console.log(deleteFilms);
                localStorage.setItem('deleteFilms', JSON.stringify(deleteFilms));
            }
            else {
                deleteFilms.push({
                    count: 20*(page-1) + i,
                    sortKind: sort_by});
                console.log(deleteFilms);
                localStorage.setItem('deleteFilms', JSON.stringify(deleteFilms));
            }
            deleteFilmOnPage();
        });
    };
    
}
//user
if (autorizationCheckId >'1') {
    signButton.textContent = 'Sign Out';
    users = JSON.parse(localStorage.getItem('usersInformation'));
    userName.textContent = users[autorizationCheckId-1].name;
}

//null page
if (autorizationCheckId === '0') {
    users = JSON.parse(localStorage.getItem('usersInformation'));
    if (userName.textContent === 'admin') {
        addFilmButton.classList.remove('selectMenu__newFilm-active');
        addFilmButton.classList.add('selectMenu__newFilm');
        for (let i=0; i < buscketImage.length; i++) {
            buscketImage[i].classList.remove("filmsMenu__bascket-image-active");
            buscketImage[i].classList.add("filmsMenu__bascket-image");
        }
    } 
}


//add film
addFilmButton.addEventListener('click', function() {
    document.location.href = "/newFilmAdd.html";
})

//ganres
ganresURL = `https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=f548b682cf24c37f64f1d20d7fca99e9`;
fetch(ganresURL)
.then(function(response) { return response.json(); })
.then(function(data) {
    for (let i=0; i < data.genres.length; i++) {
        genre[i] = data.genres[i];
    }
    localStorage.setItem('genre', JSON.stringify(genre));
});    

//delete function
function deleteFilmOnPage() {
    for (let j=0; j < wrappers.length; j++) {
        wrappers[j].classList.remove('deleteFilm');
    }    
    for (let i=0; i < deleteFilms.length; i++) {
        for (let j=0; j < wrappers.length; j++) {
            if ((Math.trunc(((deleteFilms[i].count)/20)+1) === Number(page)) 
            && (deleteFilms[i].count%20 === j) 
            && deleteFilms[i].sortKind === sort_by) {
                wrappers[j].classList.add('deleteFilm');
            }
        }                
    } 
}

//edit function
function editFilmOnPage() { 
    for (let i=0; i < editionFilms.length; i++) {
        for (let j=0; j < wrappers.length; j++) {
            if ((Math.trunc(((editionFilms[i].count)/20)+1) === Number(page)) 
            && (editionFilms[i].count%20 === j) 
            && editionFilms[i].sortKind === sort_by) {
                release_dates[j].textContent = `Data release: ${editionFilms[i].releaseDate}`;
                vote_ratings[j].textContent = `Vote rating: ${editionFilms[i].voteAverage}`;
            }
        }                
    } 
}

// user votes
function editVote() {

}

//new films function
function setNewFilm() {
    let j=0;
    for (let i=0; i < choiseFilm.length; i++) {        
        if (choiseFilm[i].classList.contains('deleteFilm') != true 
        && newFilm
        && newFilm[j] 
        && choiseSelect.value === 'None'
        && newFilm[j].id%20 === j
        && Math.trunc((newFilm[j].id/20)+1) === Number(page)) {
            images[i].src = '/assets/delete_icon.png';   
            release_dates[i].textContent = `Data release: ${newFilm[j].releaseDate}`;
            vote_ratings[i].textContent = `Vote rating: ${newFilm[j].voteAverage}`;
            j++;
        }                
    }
}










