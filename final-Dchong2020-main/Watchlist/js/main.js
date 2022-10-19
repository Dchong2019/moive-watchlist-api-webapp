import { resultsEl, watchlistMovies, renderMovies } from "./functions.js";
const searchEl = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");

let moviesArr;

class Movie {
    constructor(poster, title, year, runtime, genre, plot, imdbRating, imdbID) {
        this.poster = poster;
        this.title = title;
        this.year = year;
        this.runtime = runtime;
        this.genre = genre;
        this.plot = plot;
        this.imdbRating = imdbRating;
        this.imdbID = imdbID;
    }
}

// Focus on search input when page load
window.onload = searchEl.focus();

// EventListener for input when enter button clicked
searchEl.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        getMovies();
    }
});

// EventListener for search button click
searchBtn.addEventListener("click", getMovies);

// Get movies data
async function getMovies() {
    const searchValue = searchEl.value;
    const res = await fetch(`https://www.omdbapi.com/?apikey=fc844ecf&s=${searchValue}`).catch(handleError);
    const data = await res.json();
    // When call API is fulfilled but there is no data to display (Movie isn't found || Too many results)
    if (data.Response === "False") {
        handleError();
        return;
    }
    // Get an array of movies imdb id
    const ids = data.Search.map((movie) => movie.imdbID);
    // Get an array of objects for each movie with its details after resolve all promises for each movie id
    moviesArr = await Promise.all(
        ids.map(async (id) => {
            const res = await fetch(`https://www.omdbapi.com/?apikey=fc844ecf&i=${id}`).catch(handleError);
            const data = await res.json();
            return new Movie(
                data.Poster,
                data.Title,
                data.Year,
                data.Runtime,
                data.Genre,
                data.Plot,
                data.imdbRating,
                data.imdbID
            );
        })
    );
    // Render movies in HTML
    renderMovies(moviesArr);
}

// Render error message when error happen in API call
function handleError() {
    resultsEl.innerHTML = `
        <div class="error-message info">
            <p>Unable to find what you 're looking for.</p>
            <p>Please try another search.</p>
        </div>
    `;
}

const watchlistBtns = document.getElementsByClassName("movie-watchlist-btn");

resultsEl.addEventListener("click", function (event) {
    const btnsArr = Array.from(watchlistBtns);
    const btnIndex = btnsArr.indexOf(event.target);

    if (event.target.classList.contains("add-watchlist-btn")) {
        btnsArr[btnIndex].classList.remove("add-watchlist-btn");
        btnsArr[btnIndex].classList.add("remove-watchlist-btn");

        // Add selected movie to watchlistMovies array
        watchlistMovies.push(moviesArr[btnIndex]);
    } else if (event.target.classList.contains("remove-watchlist-btn")) {
        btnsArr[btnIndex].classList.remove("remove-watchlist-btn");
        btnsArr[btnIndex].classList.add("add-watchlist-btn");

        // Get index of the movie want to remove
        const removedIndex = watchlistMovies.indexOf(moviesArr[btnIndex]);
        // Remove movie from watchlistMovies array
        watchlistMovies.splice(removedIndex, 1);
    }
    // Add watchlistMovies array to localStoarge with key "watchlist"
    localStorage.setItem("watchlist", JSON.stringify(watchlistMovies));
});
