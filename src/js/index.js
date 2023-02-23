const search__button = document.querySelector("#search--btn");
const nav__logo = document.querySelector("#nav--logo");
const home__content = document.querySelector('#home--content');
const pokemon__content = document.querySelector("#pokemon--content");
const pokemon__input = document.querySelector("#pname-input");
const pokemon__species = document.querySelector("#pokemon--species");
const pokemon__type = document.querySelector("#pokemon--type");
const pokemon__image = document.querySelector("#pokemon--image");
const pokemon__height = document.querySelector("#pokemon--height");
const pokemon__weight = document.querySelector("#pokemon--weight");

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
    displayHandler__clean();
    // Loading Animation
    const load__outter = document.createElement('div');
    const load__inner = document.createElement('div');

    load__outter.className = 'animate-spin flex items-center justify-center mx-auto my-auto rounded-full w-14 h-14 bg-gradient-to-tr from-purple-700 to-red-500 absolute inset-0'
    load__inner.className = 'h-9 w-9 rounded-full bg-white';

    load__outter.append(load__inner);

    pokemon__type.parentNode.insertBefore(load__outter, pokemon__type.nextSibling);

    fetch(url + pokemon__input.value.toLowerCase()).then((response) => {
        console.log('resolved', response);
        load__outter.remove();
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

    //pokemon__input.select();
});
const displayHandler = function (data) {
    console.log(data);
    // Data Retrieval
    pokemon__species.innerText = data.species.name;
    //const types = [];
    for (let i = 0; i < data.types.length; i++) {
        const type_label = document.createElement('h1');
        const type_name = data.types[i].type.name;
        type_label.innerText = type_name;
        type_label.className = 'm-2 p-2 border rounded-xl text-xl text-white w-[100px]';
        type_bg = 'bg-' + type_name;
        type_label.classList.add(type_bg);
        pokemon__type.append(type_label);
    }
    pokemon__image.setAttribute('src', data.sprites.front_default);
    pokemon__height.innerText = 'Height - ' + data.height;
    pokemon__weight.innerText = 'Weight - ' + data.weight;
}
const displayHandler__err = function () {
    pokemon__species.innerText = "Sorry, we could not find that Pokémon";
    pokemon__image.setAttribute('src', './src/assets/images/sad-pokemon.png');
}
const displayHandler__clean = function () {
    pokemon__species.innerText = '';
    pokemon__type.innerText = '';
    pokemon__image.removeAttribute('src');
    pokemon__height.innerText = '';
    pokemon__weight.innerText = '';
}