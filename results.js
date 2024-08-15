const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODViYTQzNmE1Y2QxZWRmMTk2M2E0NmVjZmJkNjc2YSIsIm5iZiI6MTcyMjAyMDcyNi42MzYxNzMsInN1YiI6IjY2YTNlYWM4YjQxYjY1NDY5ZWIxMjRmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BHx470qugTDBzjuyZaAdTl1xlID7qk5lCSNzwhxV6YA'; // Replace with your actual API key

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      //api access code
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODViYTQzNmE1Y2QxZWRmMTk2M2E0NmVjZmJkNjc2YSIsIm5iZiI6MTcyMjAyMDcyNi42MzYxNzMsInN1YiI6IjY2YTNlYWM4YjQxYjY1NDY5ZWIxMjRmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BHx470qugTDBzjuyZaAdTl1xlID7qk5lCSNzwhxV6YA'
    }
}

async function getMoviesByQuery(query) {
    try {
        let response = await fetch(`${BASE_URL}/search/movie?query=${query}`, options);
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
    }
}
async function getGenres() {
    try {
        let genresList = await fetch('https://api.themoviedb.org/3/genre/movie/list', options);
        return await genresList.json();
    }catch(error) {
        console.error(error);
    }
}

async function getMoveBy(search) {
    try {
        let reponseMovie = await fetch(`https://api.themoviedb.org/3/movie/${search}`, options);
        return await reponseMovie.json();
    }catch(error) {
        console.error(error);
    }
}

async function getMovieById(id) {
    try {
        let reponseMovie = await fetch('https://api.themoviedb.org/3/movie/' + id + '?language=en-US', options);
        return await reponseMovie.json();
    }catch(error) {
        console.error(error);
    }
}

function loadMovie(movieTitle, movieLength, movieImage, movieDesc, movieGenre, movieYear, movieRating, movieCert, movieId) {
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
            <button class="lg-btn addBtn"id="${movieId}"> Add to list </button>
        </div>
    </div>`
    document.querySelectorAll('.addBtn').forEach(btn => {
        btn.addEventListener("click", prependToCurrentList, {once: true}); 
    });
}

function convert(num) {
    console.log(num);
    // Check if num is a valid number
    if (isNaN(num) || num == null) {
        return 'Invalid time';
    }
    let hours = Math.floor(num / 60);
    let mins = num % 60; 
    if (hours === 0) {
        return `${mins} mins`;
    } else if (mins === 0) {
        return `${hours} ${hours === 1 ? 'hr' : 'hrs'}`;
    } else {
        return `${hours} ${hours === 1 ? 'hr' : 'hrs'} ${mins} ${mins === 1 ? 'min' : 'mins'}`;
    }
}
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

window.onload = async function () {
    const movieName = new URLSearchParams(window.location.search).get('movieName');
    if (!movieName) {
        return;
    }

    let response = await getMoviesByQuery(movieName);
    if (response && response.results.length > 0) {
        let movies = response.results;
        
        // Iterate over each movie result
        for (let movie of movies) {
            let movieTitle = movie.title;
            let movieDetails = await getMovieById(movie.id);
            let movieLength = convert(movieDetails.runtime);
            let movieImage = 'https://image.tmdb.org/t/p/original/' + movie.backdrop_path;
            let movieDesc = movie.overview;
            let movieGenre = (movieDetails.genres && movieDetails.genres.length > 0) ? movieDetails.genres[0].name : 'Unknown';
            let movieYear = movie.release_date.slice(0,4);
            let movieCert = await getCertification(movie.id); // Await here
            let movieId = movie.id;
            let movieRating = Math.floor(movie.vote_average * 10) / 10;
            loadMovie(movieTitle, movieLength, movieImage, movieDesc, movieGenre, movieYear, movieRating + "/10", movieCert, movieId);
        }
    } else {
        alert('No results found!');
    }
};
