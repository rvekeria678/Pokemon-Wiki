/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./index.html', './src/js/index.js'],
  safeList: [
    'bg-normal',
    'bg-fire',
    'bg-water',
    'bg-grass',
    'bg-electric',
    'bg-ice',
    'bg-fighting',
    'bg-poison',
    'bg-ground',
    'bg-flying',
    'bg-psychic',
    'bg-bug',
    'bg-rock',
    'bg-ghost',
    'bg-dark',
    'bg-dragon',
    'bg-steel',
    'bg-fairy'
  ],
  theme: {
    extend: {
      colors: {
        'normal': '#A8A878',
        'fire': '#F08030',
        'water': '#6890F0',
        'grass': '#78C850',
        'electric': '#F8D030',
        'ice': '#98D8D8',
        'fighting': '#C03028',
        'poison': '#A040A0',
        'ground': '#E0C068',
        'flying': '#A890F0',
        'psychic': '#F85888',
        'bug': '#A8B820',
        'rock': '#B8A038',
        'ghost': '#705898',
        'dark': '#705848',
        'dragon': '#7038F8',
        'steel': '#B8B8D0',
        'fairy': '#EE99AC'
      },
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
        Babylonica: ['Babylonica', 'cursive'],
        Phudu: ['Phudu', 'cursive']
      },
    },

  },
  plugins: [],
}
