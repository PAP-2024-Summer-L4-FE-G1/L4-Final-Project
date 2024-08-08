const recent = document.getElementById('recent');
const myWatchList = document.getElementById('myWatchList');
const recommendation = document.getElementById('recommendation');
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      //api access code
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODViYTQzNmE1Y2QxZWRmMTk2M2E0NmVjZmJkNjc2YSIsIm5iZiI6MTcyMjAyMDcyNi42MzYxNzMsInN1YiI6IjY2YTNlYWM4YjQxYjY1NDY5ZWIxMjRmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BHx470qugTDBzjuyZaAdTl1xlID7qk5lCSNzwhxV6YA'
    }
  };

//testing begin
// localStorage.clear();
// let movie = ["14609", "24428", "109088", "14609", "14609" , "14609", "14609", "14609", "14609", "14609", "14609", "14609"];
// let string = JSON.stringify(movie);
// localStorage.setItem("savedMovies", string);
//testing end

async function getMovieById(id) {
    try {
        let reponseMovie = await fetch('https://api.themoviedb.org/3/movie/' + id + '?language=en-US', options);
        return await reponseMovie.json();
    }catch(error) {
        console.error(error);
    }
}

async function getRecommendationsById(id) {
    try {
        let reponseMovie = await fetch('https://api.themoviedb.org/3/movie/' + id + '/recommendations', options);
        return await reponseMovie.json();
    }catch(error) {
        console.error(error);
    }
}

async function getWatchlist(location, list) {
    let ids = JSON.parse(localStorage.getItem(location));
        for(id in ids) {        
        let movie = await getMovieById(ids[id]);
        let movieYear = movie.release_date.slice(0,4);
        let movieTitle = movie.title;
        let movieGenre = "";
        if (movie.genres[0] != undefined) {
            movieGenre = movie.genres[0].name + ". ";
        }
        let movieLength = movie.runtime;
        let movieImage = "https://image.tmdb.org/t/p/original" + movie.poster_path;
        loadMovieToList(list, movie.id, movieTitle + " ("+ movieYear + ") ", movieGenre + movieLength + " mins", movieImage);
    }
    if(list == "recommendation") {
        localStorage.removeItem(location);
    }
}

async function getRecommendations() {
    let ids = JSON.parse(localStorage.getItem("savedMovies"));
    if(ids != null) {
        let mostRecent = ids[Math.floor(Math.random()*(Math.min(ids.length, 6)))];
        let movies = await getRecommendationsById(mostRecent);
        let results = movies.results;
        let recListId = [];
        for(let i = 0; i < results.length; i++) {
            recListId.push(results[i].id)
        }
        let string = JSON.stringify(recListId);
        localStorage.setItem("savedRecs", string);
        getWatchlist("savedRecs", recommendation)
    }
}

async function getMostRecent() {
    let ids = JSON.parse(localStorage.getItem("savedMovies"));
    if(ids != null) {
        if (ids.length <= 4) {
            getWatchlist("savedMovies", recent)
        } else {
            let recentListId = [];
            for(let j = 0; j <= 4; j++) {
                recentListId.push(ids[j])
            }
            let string = JSON.stringify(recentListId);
            localStorage.setItem("recent", string);
            getWatchlist("recent", recent)
        }
    }
}

function loadMovieToList(list, movieId, movieNameDate, movieLength, movieImage) {
    let movieToAdd = document.createElement('li');
    movieToAdd.id = movieId;
    movieToAdd.innerHTML += 
    `<div class = "flex flex-row h-32 mb-10">
        <div class="basis-3/4 movie-container rounded-md">
            <h1 class="mt-7 ml-2 font-['Crimson Text'] text-xl font-bold pr-9 ">${movieNameDate}</h1>
            <h2 class="ml-2">${movieLength}</h2>
        </div>
        <div class="basis-1/4">
            <img class="rounded-md"src="${movieImage}">
        </div>
    </div>`;
    list.append(movieToAdd);
}

getWatchlist("savedMovies", myWatchList);
getRecommendations(); 
getMostRecent();