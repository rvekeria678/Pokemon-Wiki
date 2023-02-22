const search__button = document.querySelector("#search--btn");
const nav__logo = document.querySelector("#nav--logo");
const home__content = document.querySelector('#home--content');
const pokemon__content = document.querySelector("#pokemon--content");
const pokemon__input = document.querySelector("#pname-input");
pokemon__content.style.display = 'none';

nav__logo.addEventListener('click', (event) => {
    home__content.style.removeProperty('display');
    pokemon__content.style.display = 'none';
});

search__button.addEventListener('click', (event) => {
    home__content.style.display = 'none';
    pokemon__content.style.removeProperty('display');

    pokemon__input.select();
});