const recent = document.getElementById('recent');
const myWatchList = document.getElementById('myWatchList');
const recommendation = document.getElementById('recommendation');
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODViYTQzNmE1Y2QxZWRmMTk2M2E0NmVjZmJkNjc2YSIsIm5iZiI6MTcyMjAyMDcyNi42MzYxNzMsInN1YiI6IjY2YTNlYWM4YjQxYjY1NDY5ZWIxMjRmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BHx470qugTDBzjuyZaAdTl1xlID7qk5lCSNzwhxV6YA'
    }
  };

async function getMoveById(id) {
    try {
        let reponseMovie = await fetch('https://api.themoviedb.org/3/movie/' + id + '?language=en-US', options);
        return await reponseMovie.json();
    }catch(error) {
        console.error(error);
    }
}

function getWatchlist() {
    let keys = Object.keys(localStorage);
    let total = Object.keys(localStorage).length;
    if (total > 0) {
        for(let key of keys) {
            let movie = getMoveById(id);
        }
    }
}

function loadMovieToList(list, front, movieNameDate, movieGenreAgeRating, movieImage) {
    //get movie info
    let movieNameDate = "Fight Club (1999)";
    let movieGenreAgeRating = "Action. Rated R"
    let movieImage = "images/test2.jpg"
    //create li
    let movieToAdd = document.createElement('li');
    movieToAdd.id = "Movie Title";
    //put content of li
    movieToAdd.innerHTML += 
    `<div class = "flex flex-row h-24 mb-10">
        <div class="basis-3/4 movie-container rounded-md">
            <h1 class="mt-5 ml-2">${movieNameDate}</h1>
            <h2 class="ml-2">${movieGenreAgeRating}</h2>
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

let list = [1, 2, 3, 4];
let movieobjects = list.map(getMoveById);
let x = 0 
while (x < 10) {
    loadMovieToList(myWatchList, false)
    x++;
}

