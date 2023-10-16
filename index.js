const container = document.querySelector(".container")
const searchBar = document.querySelector(".search-bar input")
const searchBtn = document.querySelector(".search-btn")
let messageAlert
let searchKeyWord = "blade"

let myWatchListArray = JSON.parse(localStorage.getItem("watchList"))

searchBtn.addEventListener("click", function(){
    searchKeyWord = searchBar.value
    console.log(searchKeyWord)
    containerItems = ""
    movieApp()
})

let containerItems = ""

async function movieApp(){
    const response = await fetch(`https://www.omdbapi.com/?apikey=fb6d3e56&s=${searchKeyWord}&plot=full`)
    const data = await response.json()
    const searchArray = data.Search
    if(searchArray){
        searchArray.forEach(async element => {
            const response = await fetch(`https://www.omdbapi.com/?apikey=fb6d3e56&i=${element.imdbID}&plot=short`)
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
            <a class="watchList-container" data-imdb="${element.imdbID}">
                <i class="fa-solid fa-plus"></i>
                <p>Watchlist</p>
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
            messageAlert = document.querySelectorAll(".message")
        });
    }else{
        container.innerHTML = `
        <p class="search-text">Unable to find what you’re looking for. Please try another search.</p>
        `
    }
} 


document.addEventListener("click", e => {
    const myImdbID = e.target.parentElement.dataset.imdb
    if(myWatchListArray.includes(myImdbID)){
        messageAlert.forEach(messageID => 
        {
            if(messageID.children[0].getAttribute("data-imdb") == e.target.parentElement.dataset.imdb){
                messageID.style.display = "flex"
                messageID.style.visibility = "visible";
                setTimeout(function(){
                    messageID.style.visibility = "hidden";
                    setTimeout(function(){
                        messageID.style.display = "none"
                    },1000)
                },1000)
                messageID.children[0].children[0].textContent = "This movie or serie already added your watch list"
            }
        })
    }else if(myImdbID === undefined){
    }else{
        myWatchListArray.push(myImdbID)
        localStorage.setItem("watchList", JSON.stringify(myWatchListArray))
    }
    const localWatchListArray = JSON.parse(localStorage.getItem("watchList"))
})