const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      //api access code
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODViYTQzNmE1Y2QxZWRmMTk2M2E0NmVjZmJkNjc2YSIsIm5iZiI6MTcyMjAyMDcyNi42MzYxNzMsInN1YiI6IjY2YTNlYWM4YjQxYjY1NDY5ZWIxMjRmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BHx470qugTDBzjuyZaAdTl1xlID7qk5lCSNzwhxV6YA'
    }
  };

async function getMoveBy(topic) {
    try {
        let reponseMovie = await fetch(`https://api.themoviedb.org/3/movie/${topic}`, options);
        return await reponseMovie.json();
    }catch(error) {
        console.error(error);
    }
}
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
async function getMovie() {         
    let response = await getMoveBy('popular');
    let movieArr = response.results;
    let movObj = movieArr[Math.floor(Math.random() * 20)];
    let movie = await getMoveBy(movObj.id);
    let movieTitle = movie.title;
    let movieLength = convert(movie.runtime);
    let movieImage = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    let movieDesc = movie.overview;

    loadMovie(movieTitle, movieLength, movieImage, movieDesc);
}
function loadMovie(movieTitle, movieLength, movieImage, movieDesc) {
    document.getElementById('lg-movie').innerHTML += 
    `    <div class = "lg-container" style="background-image: url('${movieImage}');"> 
        <div class="lg-btns">
            <button class="lg-btn" id="age-rating" > PG</button>
            <button class="lg-btn" id="review-rating" > 8.0/10 </button>
            <button class="lg-btn"id="add-list"> Add to list </button>
        </div>
        <div class = "lg-info">
            <h1> ${movieTitle} </h1>
            <h3> ${movieLength} </h3>
            <div class="lg-desc">
            <p> ${movieDesc}</p>
            </div>
        </div>
    </div>`;
}
getMovie();
