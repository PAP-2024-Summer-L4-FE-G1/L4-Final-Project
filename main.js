const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      //api access code
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODViYTQzNmE1Y2QxZWRmMTk2M2E0NmVjZmJkNjc2YSIsIm5iZiI6MTcyMjAyMDcyNi42MzYxNzMsInN1YiI6IjY2YTNlYWM4YjQxYjY1NDY5ZWIxMjRmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BHx470qugTDBzjuyZaAdTl1xlID7qk5lCSNzwhxV6YA'
    }
  };

async function getMoveBy() {
    try {
        let reponseMovie = await fetch('https://api.themoviedb.org/movie/1022789-inside-out-2?language=en-US', options);
        return await reponseMovie.json();
    }catch(error) {
        console.error(error);
    }
}
async function getMovie() {         
    let movie = await getMoveBy();
    let movieTitle = movie.title;
    let movieLength = movie.runtime;
    let movieImage = "https://image.tmdb.org/t/p/original" + movie.poster_path;
    loadMovie(movieTitle, movieLength + " mins");
}
function loadMovie(movieTitle, movieLength) {
    document.getElementById('body').innerHTML += 
    `    <div class = "lg-container" style="background-image: url('');"> 
        <div class="lg-btns">
            <button class="lg-btn" id="age-rating" > PG</button>
            <button class="lg-btn" id="review-rating" > 8.0/10 </button>
            <button class="lg-btn"id="add-list"> Add to list </button>
        </div>
        <div class = "lg-info">
            <h1> ${movieTitle} </h1>
            <h3> ${movieLength} </h3>
            <div class="lg-desc">
            <p> A sequel that features Riley entering puberty and experiencing brand new, 
                more complex emotions as a result. As Riley tries to adapt to her teenage years, 
                her old emotions try to adapt to the possibility of being replaced.</p>
            </div>
        </div>
    </div>`;
}
getMovie();