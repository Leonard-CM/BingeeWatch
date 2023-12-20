
// This is to create constants for API endpoints and element references
const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=000f0583bdaee1d8d4263ea267b41005&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=000f0583bdaee1d8d4263ea267b41005&query=";

//this is to get html elements by id "section/form/query"
const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");


// This Function fetches and displays movies based on URL
function returnMovies(url){
    fetch(url)
        .then(res => res.json())
        .then(function(data) {
            console.log(data.results);

            main.innerHTML = ''; 

            // Thgis Creates a row element for displaying movies
            const row = document.createElement('div');
            row.classList.add('row');

            // goes through movie data and create card elements for each movie
            data.results.forEach(element => {
                const div_card = document.createElement('div');
                div_card.setAttribute('class', 'column');
                div_card.classList.add('card');

                //const div_row = document.createElement('div');
               // div_row.setAttribute('class', 'row');

                //const div_column = document.createElement('div');
                //div_column.setAttribute('class', 'column');

                // Creates an image element and set its source to the movie poster URL
                const image = document.createElement('img');
                image.setAttribute('class', 'thumbnail');
                image.src = IMG_PATH + element.poster_path;
                //image.setAttribute('id', 'image');

                // Creates a title element and set its content to the movie title
                const title = document.createElement('h3');
                //title.setAttribute('id', 'title');
                title.innerHTML = `${element.title}`;

                //const center = document.createElement('center');

                //image.src = IMG_PATH + element.poster_path;

                //Appends the image and title to the card element
                div_card.appendChild(image);
                //div_card.appendChild(center);
                div_card.appendChild(title);
                //div_card.appendChild(div_card);
                //div_card.appendChild(div_column);

                //Appends the card to the row
                row.appendChild(div_card);
                //main.appendChild(div_row);

            });
            // Append the row containing movie cards to the main section
            main.appendChild(row);
        })

}
// Event listener when the DOM content is loaded, fetch movies based on APILINK
document.addEventListener('DOMContentLoaded', function () {
    returnMovies(APILINK); 

});

// Event listener for form submission (search bar)
form.addEventListener("submit", (e) => {
    e.preventDefault();
    //main.innerHTML = '';

    
    // Get the trimmed value from the search input
    const searchItem = search.value.trim();

    // If there's a search query, fetch and display movies based on the search query
    if (searchItem) {
        returnMovies(SEARCHAPI + searchItem);
        search.value = "";
    } else {
        // If the search query is empty, fetch and display default movies (APILINK)
        returnMovies(APILINK);
    }
});