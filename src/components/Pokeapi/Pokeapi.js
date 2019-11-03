import lodash from 'lodash';
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=807';

class Pokeapi {
  sendRequest = async function(url) {
    let response = await fetch(url);
    let jsonResponse = await response.json();
    return jsonResponse;
  };

  searchByName = async function(name) {
    const pokemonList = await this.sendRequest(apiUrl);
    const filteredList = pokemonList.results.filter(pokemon =>
      pokemon.name.includes(name)
    );
    return filteredList;
  };
  getPokemonInfo = async function(filteredList) {
    const promises = filteredList.map(pokemon =>
      this.sendRequest(pokemon.url.slice(0, pokemon.url.length - 1))
    );
    const result = await Promise.all(promises);
    const filtered = result.filter(pokemon => +pokemon.id <= 807);
    filtered.sort((pokemon1, pokemon2) => +pokemon1.id - +pokemon2.id);
    return filtered;
  };
  searchByType = async function(types, name) {
    const promises = types.map(type =>
      this.sendRequest(`https://pokeapi.co/api/v2/type/${type}`)
    );
    const pokemonObjects = await Promise.all(promises);
    const pokemonsArr = pokemonObjects.map(pokemon => pokemon.pokemon);
    const newArr = pokemonsArr.flat().map(pokemon => pokemon.pokemon);
    const removeDuplicates = lodash.uniqBy(newArr, 'name');
    const filteredList = removeDuplicates.filter(pokemon =>
      pokemon.name.includes(name)
    );
    return filteredList;
  };
}

export default Pokeapi;
