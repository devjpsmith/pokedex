const pokeContainer = document.getElementById('poke-container');
const POKEMON_COUNT = 150;
const colors = {
  fire: '#fddfdf',
  grass: '#defde0',
  electric: '#fcf7de',
  water: '#def3fd',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#f5f5f5',
  fighting: '#e6e0d4',
  normal: '#f5f5f5'
};

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
  for(let i = 1; i <= POKEMON_COUNT; i++) {
    initilizeCard(i);
    getPokemon(i);
  }
};

const initilizeCard = id => {
  const card = document.createElement('div');
  card.classList.add('pokemon');
  card.id = `${id}_card_pokemon`;
  card.innerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg" alt="">
    </div>
    <div class="info">
        <span class="number">#</span>
        <h3 class="name"></h3>
        <small class="type">Type: <span></span></small>
    </div>
  `;
  pokeContainer.appendChild(card);
};

const getPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  updateCard(data);
};

const setCapitalised = str => {
  const first = str[0].toUpperCase();
  return `${first}${str.slice(1)}`;
};

const parsePokemonData = data => {
  const types = data.types.map(t => t.type.name);
  const type = mainTypes.find(t => types.indexOf(t) > -1);
  const color = colors[type];
  return {
    id: data.id,
    number: data.id.toString().padStart(3, '0'),
    name: setCapitalised(data.name),
    type,
    color
  };
};

const updateCard = data => {
  const pokemon = parsePokemonData(data);
  const pokemonEl = document.getElementById(`${pokemon.id}_card_pokemon`);

  pokemonEl.style.backgroundColor = pokemon.color;
  const info = pokemonEl.querySelector('.info');
  const numberEl = info.querySelector('span');
  const nameEl = info.querySelector('h3');
  const typeEl = info.querySelector('small');
  numberEl.innerHTML = pokemon.number;
  nameEl.innerHTML = pokemon.name;
  typeEl.innerHTML = pokemon.type;
};

fetchPokemons();