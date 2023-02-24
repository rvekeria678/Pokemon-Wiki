const search__button = document.querySelector("#search--btn");
const nav__logo = document.querySelector("#nav--logo");
const home__content = document.querySelector('#home--container');
const pokemon__content = document.querySelector("#pokemon--container");
const pokemon__input = document.querySelector("#pname-input");
const pokemon__species = document.querySelector("#pokemon--species");
const pokemon__type = document.querySelector("#pokemon--type");
const pokemon__image = document.querySelector("#pokemon--image");
const pokemon__height = document.querySelector("#pokemon--height");
const pokemon__weight = document.querySelector("#pokemon--weight");
const pokemon__stats__header = document.querySelector("#pokemon--stats-header");
const pokemon__stats = document.querySelector("#pokemon--stats");
const pokemon__next = document.querySelector("#next--btn");
const pokemon__prev = document.querySelector("#prev--btn");
const pokemon__rand = document.querySelector("#rand--btn");
pokemon__next.style.display = 'none';
pokemon__prev.style.display = 'none';
let current_id = null;
const POKEMON_TOTAL = 1008;

// Initial page DOM element styles
pokemon__content.style.display = 'none';

const url = 'https://pokeapi.co/api/v2/pokemon/';

nav__logo.addEventListener('click', (event) => {
    home__content.style.removeProperty('display');
    pokemon__content.style.display = 'none';
    pokemon__next.style.display = 'none';
    pokemon__prev.style.display = 'none';
});
// Enter Key Handling
pokemon__input.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        search__button.click();
    }
});
// Highlights textfield when clicked upon
pokemon__input.addEventListener('click', (event) => {
    pokemon__input.select();
});
// Random Pokemon Handling
pokemon__rand.addEventListener('click', (event) => {
    pokemon__input.value = Math.floor(Math.random() * POKEMON_TOTAL) + 1;
    search__button.click();
});
// Next Pokemon Handling
pokemon__next.addEventListener('click', (event) => {
    pokemon__input.value = ++current_id;
    search__button.click();
});
// Previous Pokemon Handling
pokemon__prev.addEventListener('click', (event) => {
    pokemon__input.value = --current_id;
    search__button.click();
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
    // pokemon__input.select();
});
const displayHandler = function (data) {
    console.log(data);
    pokemon__next.style.removeProperty('display');
    pokemon__prev.style.removeProperty('display');
    if (data.id == 1) {
        pokemon__prev.disabled = true;
        pokemon__prev.style.opacity = '40%';
    } else {
        pokemon__prev.disabled = false;
        pokemon__prev.style.opacity = '100%';
    }
    if (data.id == POKEMON_TOTAL) {
        pokemon__next.disabled = true;
        pokemon__next.style.opacity = '40%';
    } else {
        pokemon__next.disabled = false;
        pokemon__next.style.opacity = '100%';
    }
    current_id = data.id;
    // Data Retrieval
    // Pokemon Name
    pokemon__species.innerText = data.species.name + ' #' + data.id;
    // Pokemon Types
    for (let i = 0; i < data.types.length; i++) {
        const type_label = document.createElement('h1');
        const type_name = data.types[i].type.name;
        type_label.innerText = type_name;
        type_label.className = 'm-2 p-2 border rounded-xl text-xl text-white w-[100px]';
        type_bg = 'bg-' + type_name;
        type_label.classList.add(type_bg);
        pokemon__type.append(type_label);
    }
    // Pokemon Height & Weight
    pokemon__image.setAttribute('src', data.sprites.front_default);
    pokemon__height.innerText = 'Height - ' + data.height;
    pokemon__weight.innerText = 'Weight - ' + data.weight;
    // Pokemon Base Stats
    pokemon__stats__header.style.removeProperty('display');
    for (let i = 0; i < data.stats.length; i++) {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        p1.innerText = data.stats[i].stat.name;
        p2.innerText = data.stats[i].base_stat;
        div.append(p1);
        div.append(p2);
        div.className = 'flex justify-between justify-center'
        li.append(div);
        //li.innerText = data.stats[i].stat.name + ' - ' + data.stats[i].base_stat;
        pokemon__stats.append(li);
    }
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
    pokemon__stats__header.style.display = 'none';
    pokemon__stats.innerText = '';
}