const recent = document.getElementById('recent');
const myWatchList = document.getElementById('myWatchList');
const recommendation = document.getElementById('recommendation');

function addMovieToList(list, front) {
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
let x = 0 
while (x < 10) {
    addMovieToList(myWatchList, false)
    x++;
}

