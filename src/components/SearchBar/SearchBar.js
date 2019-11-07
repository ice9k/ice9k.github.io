import React from 'react'
import { useLocalStore, useObserver } from 'mobx-react-lite'
import './SearchBar.sass'
import Pokeapi from '../Pokeapi/Pokeapi'

const typeNames = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy'
]

const SearchBar = props => {
  const state = useLocalStore(() => ({
    input: '',
    types: []
  }))

  const searchPokemon = async () => {
    const pokeapi = new Pokeapi()
    const filteredList = await pokeapi.searchByName(state.input)
    const info = await pokeapi.getPokemonInfo(filteredList)
    props.saveCards(info)
  }
  const searchPokemonByType = async () => {
    const pokeapi = new Pokeapi()
    const filteredList = await pokeapi.searchByType(state.types, state.input)

    const info = await pokeapi.getPokemonInfo(filteredList)
    props.saveCards(info)
  }
  const handleSearch = async () => {
    props.setIsLoading(true)
    state.types.length ? await searchPokemonByType() : await searchPokemon()
    props.setIsLoading(false)
  }
  const toggleType = event => {
    const typeName = event.target.id
    let newArr = []
    if (state.types.includes(typeName)) {
      newArr = state.types.filter(type => type !== typeName)
    } else {
      newArr = state.types.slice()
      newArr.push(typeName)
    }
    state.types = newArr
  }

  return useObserver(() => (
    <div className='SearchBar'>
      <div className='SearchBar-fields'>
        <input
          onChange={event => (state.input = event.target.value)}
          placeholder='Pokemon name'
          value={state.input}
        />

        <div onClick={handleSearch}> Search </div>
      </div>
      <div className='SearchBar-sort-options'>
        {typeNames.map(type => (
          <div
            key={type}
            className={
              type + ' typeDiv ' + (state.types.includes(type) ? 'Active' : '')
            }
            id={type}
            onClick={toggleType}
          >
            {type}
          </div>
        ))}
      </div>
    </div>
  ))
}

export default SearchBar
