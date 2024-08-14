const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODViYTQzNmE1Y2QxZWRmMTk2M2E0NmVjZmJkNjc2YSIsIm5iZiI6MTcyMjAyMDcyNi42MzYxNzMsInN1YiI6IjY2YTNlYWM4YjQxYjY1NDY5ZWIxMjRmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BHx470qugTDBzjuyZaAdTl1xlID7qk5lCSNzwhxV6YA'; // Replace with your actual API key


async function getMoviesByQuery(query) {
    try {
        let response = await fetch(`${BASE_URL}/search/movie?query=${query}`, options);
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
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

document.getElementById('form').addEventListener("submit", async (e) => {
    e.preventDefault();
    var searchTerm = document.getElementById('search').value;
    if (searchTerm) {
       /* var searchValue = searchTerm.value; */
        console.log(searchTerm);
        window.location.href = `genre.html?movieName=${searchTerm}`;
        /*let response =await getMoviesByQuery(searchTerm);
       /* if (response && response.results.length > 0) {
            let movie = response.results[0]; 
            let movieDetails = await getMovieById(movie.id);
            let movieTitle = movieDetails.title;
            let movieLength = convert(movieDetails.num);
            let movieImage = 'https://image.tmdb.org/t/p/w500' + movieDetails.poster_path;
            let movieDesc = movieDetails.overview;
            loadMovie(movieTitle, movieLength, movieImage, movieDesc);
        } else {
            alert('No results found!');
        }
    */
        }

   });
    
    

