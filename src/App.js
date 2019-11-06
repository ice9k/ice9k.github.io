import React from 'react';
import { useLocalStore, useObserver } from 'mobx-react-lite';

import './App.css';
import CardList from './components/CardList/CardList';
import SearchBar from './components/SearchBar/SearchBar';
import Pagination from './components/Pagination/Pagination';

const App = () => {
  const state = useLocalStore(() => ({
    cards: [],
    isLoading: false,
    currentPage: 1,
    cardsPerPage: 10
  }));

  const setIsLoading = boolean => {
    state.isLoading = boolean;
  };

  const saveCards = cards => {
    state.cards = cards;
  };

  const slicedArr = () => {
    const indexOfLastCard = state.currentPage * state.cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - state.cardsPerPage;
    const currentCards = state.cards.slice(indexOfFirstCard, indexOfLastCard);
    return currentCards;
  };

  const pagesCount = Math.ceil(state.cards.length / state.cardsPerPage);

  return useObserver(() => (
    <>
      <SearchBar setIsLoading={setIsLoading} saveCards={saveCards} />
      <div className='CardList'>
        {state.isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <CardList isLoading={state.isLoading} cards={slicedArr()} />
        )}

        {state.cards.length ? (
          <Pagination
            totalCards={state.cards.length}
            currentPage={state.currentPage}
            pagesCount={pagesCount}
            cards={slicedArr}
            cardsPerPage={state.cardsPerPage}
          />
        ) : (
          ''
        )}
      </div>
    </>
  ));
};
export default App;
