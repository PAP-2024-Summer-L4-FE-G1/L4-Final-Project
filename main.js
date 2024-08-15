
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      //api access code
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODViYTQzNmE1Y2QxZWRmMTk2M2E0NmVjZmJkNjc2YSIsIm5iZiI6MTcyMjAyMDcyNi42MzYxNzMsInN1YiI6IjY2YTNlYWM4YjQxYjY1NDY5ZWIxMjRmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BHx470qugTDBzjuyZaAdTl1xlID7qk5lCSNzwhxV6YA'
    }
  };
async function getMoveBy(search) {
    try {
        let reponseMovie = await fetch(`https://api.themoviedb.org/3/movie/${search}`, options);
        return await reponseMovie.json();
    }catch(error) {
        console.error(error);
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
function getInfo(movie, certification, row, size) {
    let movieTitle = movie.title;
    let movieLength = convert(movie.runtime);
    let movieImage = 'https://image.tmdb.org/t/p/original/' + movie.backdrop_path;
    let movieDesc = movie.overview;
    let movieGenre = movie.genres[0].name;
    let movieYear = movie.release_date.slice(0,4);
    let movieCert = certification;
    let movieId = movie.id;
    let movieRating = Math.floor(movie.vote_average*10)/10;
    loadMovie(movieTitle, movieLength, movieImage, movieDesc, movieGenre, movieYear, movieRating + "/10", movieCert, row, size, movieId);
}
async function getMovie(type) {     
    if (type==='lg'){
        let response = await getMoveBy('popular');
        let movieArr = response.results;
        let movObj = movieArr[Math.floor(Math.random() * 20)];
        let movie = await getMoveBy(movObj.id);
        getInfo(movie, await getCertification(movObj.id), 0, 'lg');
    } else if (type==='med-home') {
        let topicsArr = ['','upcoming', 'top_rated?language=en-US&page=1', 'now_playing?language=en-US&page=1'];
        for(j=1; j<=3; j++) {
            let response = await getMoveBy(topicsArr[j]);
            let movieArr = response.results;
            let i = 0;
            console.log(topicsArr[j]);
            while(i<=7) {
                i++;
                let movie = await getMoveBy(movieArr[i].id);
                getInfo(await movie, await getCertification(await movie.id), j, 'med');
            }
        }
    }
}
function loadMovie(movieTitle, movieLength, movieImage, movieDesc, movieGenre, movieYear, movieRating, movieCert, row, size, movieId) {
    if(size==='lg') {
        document.getElementById('lg-movie').innerHTML += 
        `<div class = "lg-container" style="background-image: url('${movieImage}');"> 
            <div class="lg-btns">
                <button class="lg-btn" id="age-rating" > ${movieCert} </button>
                <button class="lg-btn" id="review-rating" > ${movieRating} </button>
                <button class="lg-btn addBtn"id="${movieId}"> Add to list </button>
            </div>
            <div class = "lg-info">
                <h1> ${movieTitle} </h1>
                <h3> ${movieLength} </h3>
                <div class="lg-desc">
                <p> ${movieDesc}</p>
                </div>
            </div>
        </div>`;
    } else if (size==='med') {
        console.log(row);
        document.querySelector(`#med-${row}`).innerHTML+=
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
function prependToCurrentList(e) {
    let list = JSON.parse(localStorage.getItem("savedMovies"));
    
    if(list == null) {
        list = [e.target.id];
        let string = JSON.stringify(list);
        localStorage.setItem("savedMovies", string)
        console.log("Clicked")
    } else if(!list.includes(e.target.id)) {
        listChanged = [e.target.id];
        for(id in list) {
            listChanged.push(list[id]);
        }
        let string = JSON.stringify(listChanged);
        localStorage.setItem("savedMovies", string)
    }
}

getMovie('lg');
getMovie('med-home');


  