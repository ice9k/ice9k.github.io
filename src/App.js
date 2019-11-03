import React from 'react';
import { useLocalStore, useObserver } from 'mobx-react-lite';

import './App.css';
import CardList from './components/CardList/CardList';
import SearchBar from './components/SearchBar/SearchBar';
const App = () => {
  const state = useLocalStore(() => ({
    cards: [],
    isLoading: false
  }));
  const setIsLoading = boolean => {
    state.isLoading = boolean;
  };
  const saveCards = cards => {
    state.cards = cards;
  };
  return useObserver(() => (
    <div>
      <SearchBar setIsLoading={setIsLoading} saveCards={saveCards} />
      <CardList isLoading={state.isLoading} cards={state.cards} />
    </div>
  ));
};

export default App;
