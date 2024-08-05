let movie = [];
let string = JSON.stringify(movie)
localStorage.setItem("savedMovies", string);

function addToWatchlist(id) {
    let ids = JSON.parse(localStorage.getItem("savedMovies"));
    let idsAppened = ids.append(id);
    let string = JSON.stringify(idsAppened)
    localStorage.setItem("savedMovies", string);
}

const addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', () => {
    addToWatchlist(this.id)
})