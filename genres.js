
//on click, currentGenre is set to clicked button's innerHTML and getMovie() is called
let buttons = document.getElementsByClassName('genre-btn');
let buttonsArr = Array.from(buttons);
let currentGenre = 'Action';
let currentGenreId = '28'; //put actual ID later
buttonsArr.forEach((button) => {
    button.addEventListener('click', () => {
        currentGenre = button.innerHTML;
            getMovie();
    });
})

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      //api access code
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODViYTQzNmE1Y2QxZWRmMTk2M2E0NmVjZmJkNjc2YSIsIm5iZiI6MTcyMjAyMDcyNi42MzYxNzMsInN1YiI6IjY2YTNlYWM4YjQxYjY1NDY5ZWIxMjRmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BHx470qugTDBzjuyZaAdTl1xlID7qk5lCSNzwhxV6YA'
    }
}
//Returns the list of movie genres
async function getGenres() {
    try {
        let genresList = await fetch('https://api.themoviedb.org/3/genre/movie/list', options);
        return await genresList.json();
    }catch(error) {
        console.error(error);
    }
}
//Returns the list of movies filtered by given genre
async function getGenreMovsBy(genreid) {
    try {
        let reponseMovie = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreid}`, options);
        return await reponseMovie.json();
    }catch(error) {
        console.error(error);
    }
}
//Returns the specific movie object by movieId given
async function getMoveBy(search) {
    try {
        let reponseMovie = await fetch(`https://api.themoviedb.org/3/movie/${search}`, options);
        return await reponseMovie.json();
    }catch(error) {
        console.error(error);
    }
}
//Retrieves all information neccessary about movie and calls loadMovie()
function getInfo(movie, certification) {
    let movieTitle = movie.title;
    let movieLength = convert(movie.runtime);
    let movieImage = 'https://image.tmdb.org/t/p/original/' + movie.backdrop_path;
    let movieDesc = movie.overview;
    let movieYear = movie.release_date.slice(0,4);
    let movieCert = certification;
    let movieRating = Math.floor(movie.vote_average*10)/10;
    loadMovie(movieTitle, movieLength, movieImage, movieDesc, currentGenre, movieYear, movieRating + "/10", movieCert);
}
//Resets page when new button is clicked and calls getInfo with movies from genres list
async function getMovie() {    
    document.querySelector('#row-1').innerHTML='';
    let genresArr = await getGenres();
    console.log(genresArr);
    genresArr.genres.forEach((genre) => {
        if(genre.name===currentGenre) {
            currentGenreId = genre.id;
        }
    });
        let response = await getGenreMovsBy(currentGenreId); 
        let movieArr = response.results;
        let i =0;
        while(i<movieArr.length) {
            i++;
            let movie = await getMoveBy(movieArr[i].id);
            getInfo(await movie, await getCertification(await movie.id), 'med');
            }
}
//Loads movies into html and onto the page
function loadMovie(movieTitle, movieLength, movieImage, movieDesc, movieGenre, movieYear, movieRating, movieCert) {
        document.querySelector(`#row-1`).innerHTML+=
        `<div class="movie-box"> 
            <div id="top-text">
                <p id="movie-title"> ${movieTitle} </p>
                <p id="movie-length">${movieLength} </p>
            </div>
            <div style="background-image: url('${movieImage}');" class="movie-box-img box"></div>
            <p class="movie-details">${movieGenre} <br> ${movieYear} <br> <br>${movieDesc}
            </p>
            <div class="lg-btns">
                <button class="lg-btn" id="age-rating" > ${movieCert} </button>
                <button class="lg-btn" id="review-rating" > ${movieRating} </button>
                <button class="lg-btn"id="add-list"> Add to list </button>
            </div>
        </div>`
}
//Converts minute length given for movies to hr/min format
function convert (num) {
    let hours = Math.floor(num/60);
    let mins = Math.floor(num-(hours*60));
    if(hours==1 && mins==1){
        return `${hours} hr ${mins} min`;
    } else if(hours==0) {
        return `${mins} mins`; 
    } else if (mins==0) {
        return `${hours} hrs`;
    } else if (hours==1 && mins!=1) {
        return `${hours} hr ${mins} mins`;
    } else {
        return `${hours} hrs ${mins} mins`;
    }
}
//Returns the movie certification (eg. PG, R, G)
async function getCertification(movId) {
    let movRelease = await getMoveBy(`${movId}/release_dates`);
    let result ='';
    for(i = 0; i< await movRelease.results.length; i++) {        
        if(await (movRelease.results[i]).iso_3166_1==='US') {
            result = await movRelease.results[i].release_dates;
        }
    }
    for(i=0; i<result.length; i++) {
        if(result[i].certification!='') {
            return result[i].certification;
        }
    }
    return 'NR';
}
getMovie();