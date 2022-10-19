const resultsEl = document.getElementById("results");
let watchlistMovies = JSON.parse(localStorage.getItem("watchlist")) || [];

// Render array of movies in HTML
function renderMovies(array) {
    resultsEl.innerHTML = array.map((movie) => createMovieCard(movie)).join("");
}

// Create HTML of movie card
function createMovieCard(movie) {
    return `
        <div class="movie-card">
            <div class="movie-poster">
                <img src="${movie.poster}"/>
            </div>

            <div class="movie-details">
                <h2 class="movie-title">
                    ${movie.title}
                    <span class="movie-rating"><img src="img/rating-icon.png" />${movie.imdbRating}</span>
                </h2>

                <p class="movie-year">${movie.year}</p>

                <div class="movie-subdetails">
                    <p class="movie-duration">${movie.runtime}</p>
                    <p class="movie-genre">${movie.genre}</p>
                    <button class="movie-watchlist-btn ${movieBtnClassName(movie)}"></button>
                </div>

                <p class="movie-summary">${movie.plot}</p>
            </div>
        </div>`;
}

// Define className of movie's watchlist button based on if movie in the watchlist or not
function movieBtnClassName(movie) {
    let className = "add-watchlist-btn";
    watchlistMovies.forEach((element) => {
        if (movie.imdbID === element.imdbID) {
            className = "remove-watchlist-btn";
        }
    });
    return className;
}

export { resultsEl, watchlistMovies, renderMovies };
