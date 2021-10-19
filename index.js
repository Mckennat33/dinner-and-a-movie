document.addEventListener('DOMContentLoaded', function(){ 

    let dinnerBtn = document.querySelector("#dinner > button").addEventListener('click', (event) => {

        fetch("https://the-cocktail-db.p.rapidapi.com/random.php", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
                "x-rapidapi-key": "de51889a1fmshe095099b1a97993p13134fjsnc818ad7373cb"
            }
        })
        .then(response => response.json())
        .then(chosenCocktail)
        .catch(err => {
            console.error(err);
        });
    
})


    let movieBtn = document.querySelector('.movie-button').addEventListener('click', (event) => {

    fetch("https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-random-movies&page=1", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
            "x-rapidapi-key": "de51889a1fmshe095099b1a97993p13134fjsnc818ad7373cb"
        }
    })
    .then(response => response.json())
    .then(chosenMovieGenre)
    })

////////////////////////////////////////////////////////////////////////////////
}) // End of DOMContentLoaded


function chosenCocktail(cocktail) {
    console.log(cocktail)

    let cocktailArray = cocktail.drinks
    // console.log(cocktailArray)
    let alcChosen = document.getElementById('dropdown-alc').value
    let randomizedDrink = cocktailArray.map((drinks) => {
        if (drinks.strAlcoholic === alcChosen) {
            let drinkCard = document.createElement('h3')
            let chosenDrink = drinks.strDrink
            let chosenDrinkImg = drinks.strDrinkThumb
            // console.log(chosenDrinkImg)
            return drinkCard.innerText = `<img src="${chosenDrinkImg}" id="new-cocktail-image"> <p>${chosenDrink}</p>`
        }
    })
    renderCocktail(randomizedDrink)
}

function renderCocktail(drinks) {
    let randomCocktail = drinks
    

    let newDrinkCard = document.createElement('div')
    newDrinkCard.id = "new-cocktail-card"

    let drinkTitle = document.createElement('h3')
    drinkTitle.id = "new-cocktail-card"
    drinkTitle.innerHTML = randomCocktail

    let drinkInfo = document.getElementById("dinner-info")
    drinkInfo.innerHTML = ''



    drinkInfo.append(drinkTitle)
}













function chosenMovieGenre(jsonObject){
    let arrayGenres = jsonObject.movie_results
    let genreChosen  = document.getElementById('dropdown-movie').value
    let filteredMovies = arrayGenres.map((movie) => {
        if (movie.genres && movie.genres[0] === genreChosen) {
                let movieTitle = movie.title
                let movieGenres = movie.genres[0]
                let movieRating = movie.imdb_rating
                let movieTitlePar = document.getElementById('movie-title')
                let movieTitleEx = document.createElement('h3')
                return movieTitleEx.innerHTML = `<p id="movie-title">Title: ${movieTitle}</p> <p   id="movie-genre">Genre: ${movieGenres}</p> <p id="movie-rating"">Rating: ${movieRating}/10</p>`
            } // debugger;
        })
        randomizeMovie(filteredMovies);
        // renderMovie(filteredMovies)
    }


function randomizeMovie(titles) {
    // let filteredTitles = titles.filter(title => title != undefined)
    // let randomIndex = Math.floor(Math.random() * filteredTitles.length)
    // let randomTitle = filteredTitles[randomIndex]

    let filteredTitles = titles.filter(title => title !== undefined)
    let randomIndex = Math.floor(Math.random() * filteredTitles.length)
    let randomTitle = filteredTitles[randomIndex]

    // console.log(randomTitle)  
    // let movieTitlePar = document.getElementById('new-movie-card')
    let movieTitlePar = document.createElement('div')
    movieTitlePar.id = "new-movie-card"
    // console.log(movieTitlePar)
    let movieTitle = document.createElement('h3')
    movieTitle.innerHTML = randomTitle

    let movieImg = document.createElement('img')
    movieImg.id = 'new-movie-image'
    movieImg.src = 'movietitleimg.jpg'
    
    let deleteBtn = document.createElement('button')
    deleteBtn.id = 'delete-button'
    deleteBtn.innerHTML = "Delete"
    // movieTitlePar.innerHTML = "" //clearing the previous card info
    let info = document.getElementById('info')
    info.innerHTML = ''
    info.append(movieTitlePar)
    deleteBtn.addEventListener('click', deleteMovie)

    movieTitlePar.append(movieImg, movieTitle, deleteBtn) //, movieTitle)
    // debugger;
}

function deleteMovie(event) {
    event.target.parentNode.remove()
}




