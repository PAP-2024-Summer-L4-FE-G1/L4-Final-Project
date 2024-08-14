const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODViYTQzNmE1Y2QxZWRmMTk2M2E0NmVjZmJkNjc2YSIsIm5iZiI6MTcyMjAyMDcyNi42MzYxNzMsInN1YiI6IjY2YTNlYWM4YjQxYjY1NDY5ZWIxMjRmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BHx470qugTDBzjuyZaAdTl1xlID7qk5lCSNzwhxV6YA'; // Replace with your actual API key

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODViYTQzNmE1Y2QxZWRmMTk2M2E0NmVjZmJkNjc2YSIsIm5iZiI6MTcyMjAyMDcyNi42MzYxNzMsInN1YiI6IjY2YTNlYWM4YjQxYjY1NDY5ZWIxMjRmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BHx470qugTDBzjuyZaAdTl1xlID7qk5lCSNzwhxV6YA'

    }
};

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
        let response = await fetch(`${BASE_URL}/movie/${id}`, options);
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
    }
}

function loadMovie(movieTitle, movieLength, movieImage, movieDesc) {
    document.getElementById('lg-movie').innerHTML = 
    `<div class="lg-container" style="background-image: url('${movieImage}');"> 
        <div class="lg-info">
            <h1>${movieTitle}</h1>
            <h3>${movieLength}</h3>
            <div class="lg-desc">
                <p>${movieDesc}</p>
            </div>
        </div>
    </div>`;
}

function convert(runtime) {
    let hours = Math.floor(runtime / 60);
    let minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
}

document.getElementById('form').addEventListener("submit", async (e) => {
    e.preventDefault();
    var searchTerm = document.getElementById('search').value;
    if (searchTerm) {
       /* var searchValue = searchTerm.value; */
        console.log(searchTerm);
        let response =await getMoviesByQuery(searchTerm);
        if (response && response.results.length > 0) {
            let movie = response.results[0]; 
            let movieDetails = await getMovieById(movie.id);
            let movieTitle = movieDetails.title;
            let movieLength = convert(movieDetails.runtime);
            let movieImage = 'https://image.tmdb.org/t/p/w500' + movieDetails.poster_path;
            let movieDesc = movieDetails.overview;
            loadMovie(movieTitle, movieLength, movieImage, movieDesc);
        } else {
            alert('No results found!');
        }
    }
});