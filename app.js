const pokemonsGlobal = [];
const pokemonGrid = document.querySelector("#pokemon-grid");
const searchInput = document.querySelector('#search-pokemon');


const cleanView = () => {
  pokemonGrid.innerHTML = '';
}

searchInput.addEventListener('keyup', () => {
  const inputValue = searchInput.value;
  console.log(inputValue);
  let pokemonsGlobal2 = searchByName(inputValue);
  console.log(pokemonsGlobal2);
  cleanView();
  renderPokemonCard(pokemonsGlobal2);
});

const searchByName = (searchingParameter) => {
  const filteredPokemon = pokemonsGlobal.filter((pokemon)=> {
      if(pokemon.name.includes(searchingParameter)) {
          return pokemon
      }
  })
  return filteredPokemon
}

const getPokemons = async () => {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20"
  );
  const responseJson = await response.json();
  const pokemons = responseJson.results;

  for (let i = 0; i < pokemons.length; i++) {
    const pokemon = pokemons[i];
    const pokemonUrl = pokemon.url;
    const response = await fetch(pokemonUrl);
    const responseJson = await response.json();
    normalizePokemons(responseJson);
  }
  
  renderPokemonCard(pokemonsGlobal);
}

const normalizePokemons = (pokemon) => {
  const img = pokemon.sprites.other["official-artwork"].front_default;
  let types = "";
  for (let i = 0; i < pokemon.types.length; i++) {
    console.log(pokemon.types[i].type.name);
    types += pokemon.types[i].type.name;
    const isNotLastOne = i !== (pokemon.types.length - 1)
    if(isNotLastOne) {
      types += ' ';
    }
  }

  const pokemonObject = {
    name: pokemon.name,
    img,
    types,
  };
  pokemonsGlobal.push(pokemonObject);
}

const renderPokemonCard = (array) => {
  for (let i = 0; i < array.length; i++) {
    console.log(pokemonsGlobal[i]);
    const pokemonCard = document.createElement("div");
    pokemonCard.classList = "pokemon-card";
    pokemonCard.innerHTML = `
        <h2>${array[i].name}</h2>
        <img src="${array[i].img}"/>
        <p>${array[i].types}</p>
        `;
    pokemonGrid.appendChild(pokemonCard);
  }
}

getPokemons();
