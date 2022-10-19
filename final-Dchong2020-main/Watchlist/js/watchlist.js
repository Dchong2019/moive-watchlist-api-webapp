import { resultsEl, watchlistMovies, renderMovies } from "./functions.js";
const watchlistBtns = document.getElementsByClassName("movie-watchlist-btn");

if (watchlistMovies.length) {
    renderMovies(watchlistMovies);
}

resultsEl.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-watchlist-btn")) {
        const btnsArr = Array.from(watchlistBtns);
        const btnIndex = btnsArr.indexOf(event.target);
        // Add selected movie to watchlistMovies array
        watchlistMovies.splice(btnIndex, 1);
    }
    // Add watchlistMovies array to localStoarge with key called "watchlist"
    localStorage.setItem("watchlist", JSON.stringify(watchlistMovies));
    renderMovies(watchlistMovies);

    if (!watchlistMovies.length) {
        localStorage.removeItem("watchlist");
        resultsEl.innerHTML = `
            <p class="watchlist-info info">Your watchlist is looking a little empty...</p>
            <a href="index.html" class="add-movies-btn">
                <img src="img/add-icon.png" />
                Let’s add some movies!
            </a>
        `;
    }
});
