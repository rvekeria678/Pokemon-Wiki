const search__button = document.querySelector("#search--btn");
const nav__logo = document.querySelector("#nav--logo");
const home__content = document.querySelector('#home--content');
const pokemon__content = document.querySelector("#pokemon--content");
const pokemon__input = document.querySelector("#pname-input");
const pokemon__species = document.querySelector("#pokemon--species");
const pokemon__type = document.querySelector("#pokemon--type");
const pokemon__image = document.querySelector("#pokemon--image");

// Initial page DOM element styles
pokemon__content.style.display = 'none';

const url = 'https://pokeapi.co/api/v2/pokemon/';

nav__logo.addEventListener('click', (event) => {
    home__content.style.removeProperty('display');
    pokemon__content.style.display = 'none';
});

search__button.addEventListener('click', (event) => {
    home__content.style.display = 'none';
    pokemon__content.style.removeProperty('display');

    fetch(url + pokemon__input.value.toLowerCase()).then((response) => {
        console.log('resolved', response);
        if (response.status == 404) {
            displayHandler__err();
        } else {
            return response.json();
        }
    }).then((data) => {
        displayHandler(data);
    }).catch((err) => {
        console.log('Network Error:', err);
    });

    pokemon__input.select();
});
const displayHandler = function (data) {
    console.log(data);

    // Data Retrieval
    pokemon__species.innerText = data.species.name;

    pokemon__image.setAttribute('src', data.sprites.front_default);
    // Data Styling
}
const displayHandler__err = function () {
    pokemon__species.innerText = "Sorry, we could not find that Pokémon";
    pokemon__type.innerText = '';
    pokemon__image.setAttribute('src', './src/assets/images/sad-pokemon.png');
}