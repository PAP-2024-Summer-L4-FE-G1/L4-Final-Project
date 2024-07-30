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
localStorage.clear();
let movie = ["24428", "109088", "14609"];
let string = JSON.stringify(movie)
localStorage.setItem("savedMovies", string);
//testing end

async function getMoveById(id) {
    try {
        let reponseMovie = await fetch('https://api.themoviedb.org/3/movie/' + id + '?language=en-US', options);
        return await reponseMovie.json();
    }catch(error) {
        console.error(error);
    }
}

async function getWatchlist() {
    let ids =  JSON.parse(localStorage.getItem("savedMovies"))
        for(id in ids) {          
            let movie = await getMoveById(ids[id]);
            console.log(movie)
            let movieDate = movie.release_date;
            let movieYear = movieDate.slice(0,4);
            let movieTitle = movie.title;
            let movieGenres = movie.genres[0];
            let movieGenre = movieGenres.name;
            let movieLength = movie.runtime;
            let movieImage = "https://image.tmdb.org/t/p/original" + movie.poster_path;
            loadMovieToList(myWatchList, false, movie.id, movieTitle + " ("+ movieYear + ") ", movieGenre + ". " + movieLength + " mins", movieImage)
    }
}

function loadMovieToList(list, front, movieId, movieNameDate, movieLength, movieImage) {
    //create li
    let movieToAdd = document.createElement('li');
    movieToAdd.id = movieId;
    //put content of li
    movieToAdd.innerHTML += 
    `<div class = "flex flex-row h-24 mb-10">
        <div class="basis-3/4 movie-container rounded-md">
            <h1 class="mt-5 ml-2">${movieNameDate}</h1>
            <h2 class="ml-2">${movieLength}</h2>
        </div>
        <div class="basis-1/4">
            <img class="rounded-md"src="${movieImage}">
        </div>
    </div>`;
    //insert li into current list
    if (front) {
        list.prepend(movieToAdd);
    } else {
        list.append(movieToAdd);
    }
    
}

 //testing
getWatchlist();