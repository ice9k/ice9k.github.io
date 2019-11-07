import React from 'react';
import { useLocalStore, useObserver } from 'mobx-react-lite';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import CardList from './components/CardList/CardList';
import SearchBar from './components/SearchBar/SearchBar';


const App = () => {
  const state = useLocalStore(() => ({
    cards: [],
    isLoading: false,
    currentPage: 1,
    cardsPerPage: 10,
  
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
  
  const setCardsPerPage = (current , number) => { 
    state.cardsPerPage = number
    paginate(1)
 }
  const paginate = pageNumber => {
    state.currentPage = pageNumber}

  return useObserver(() => (
    <>
      <SearchBar setIsLoading={setIsLoading} saveCards={saveCards} />
      <div className='CardList'>
        {state.isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <CardList isLoading={state.isLoading} cards={slicedArr()} />
        )}

        {state.cards.length && !state.isLoading? (
          <Pagination
          showSizeChanger
          onShowSizeChange={setCardsPerPage}
          defaultCurrent={1}
          current={state.currentPage}
          onChange={paginate}
          pageSizeOptions={['10', '20', '30']}
          total={state.cards.length}
          pageSize = {state.cardsPerPage}
        />
        ) : (
          ''
        )}
      </div>
    </>
  ));
};
export default App;
