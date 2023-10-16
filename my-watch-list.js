const container = document.querySelector(".container")

const watchListArray = JSON.parse(localStorage.getItem("watchList"))

console.log(watchListArray)

containerItems = ""

async function watchListAPI(element, index){
    const response = await fetch(`https://www.omdbapi.com/?apikey=fb6d3e56&i=${watchListArray[index]}&plot=short`)
    const movie = await response.json()
        containerItems += `
        <div class="item">
        <img class="movie-poster" src="${movie.Poster}">
        <h3 class="movie-title">${movie.Title}</h3>
        <div class="imdb-container">
            <i class="fa-solid fa-star" style="color: #fec654;"></i>
            <p class="imdb-rating">${movie.imdbRating}</p>
        </div>
        <p class="movie-time">${movie.Runtime}</p>
        <p class="movie-genre">${movie.Genre}</p>
        <a class="watchList-container" data-imdb="${element}">
            <i class="fa-solid fa-minus"></i>
            <p>Remove</p>
        </a>
        <p class="movie-description">${movie.Plot}</p>
        <section class="message">
        <div class="message-item" data-imdb="${element.imdbID}">
            <p>This movie or serie already added your watch list</p>
        </div>
        </section>
        </div>
        `
        container.innerHTML = containerItems
}


if(watchListArray.length > 0){
    watchListArray.forEach((element, index) => {
        console.log(element, index)
        const movies = watchListAPI(element, index)
    });
}else{
    container.innerHTML = `
    <p class="search-text">Your watchlist is looking a little empty...</p>
    <a class="add-container" href="/index.html">
    <i class="fa-solid fa-plus"></i>
    <p>Let’s add some movies!</p>
    </a>
    `
}



document.addEventListener("click", e => {
    if(e.target.parentElement.className === "watchList-container"){
        const imdbID = e.target.parentElement.dataset.imdb
        const removeArray = JSON.parse(localStorage.getItem("watchList"))
        const newArray = removeArray.filter(item => item !== imdbID)
        localStorage.setItem("watchList", JSON.stringify(newArray))
        e.target.parentElement.parentElement.remove()
    }
})