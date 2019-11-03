import React from 'react';
import './CardList.sass';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import { useLocalStore, useObserver } from 'mobx-react-lite';

const CardList = props => {
  const state = useLocalStore(() => ({
    currentPage: 1,
    cardsPerPage: 10
  }));

  const renderCurrentCards = () => {
    const list = props.cards.map(card => {
      return <Card key={card.id} card={card} />;
    });

    const indexOfLastCard = state.currentPage * state.cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - state.cardsPerPage;
    const currentCards = list.slice(indexOfFirstCard, indexOfLastCard);
    console.log(currentCards);
    return currentCards;
  };
  const setCardsPerPage = number => (state.cardsPerPage = number);
  const paginate = pageNumber => {
    state.currentPage = pageNumber;
    console.log(state.currentPage);
  };

  return useObserver(() => (
    <div className='CardList'>
      {props.isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {renderCurrentCards()}
          {props.cards.length ? (
            <Pagination
              cards={renderCurrentCards()}
              totalCards={props.cards.length}
              cardsPerPage={state.cardsPerPage}
              paginate={paginate}
              setCardsPerPage={setCardsPerPage}
              currentPage={state.currentPage}
            />
          ) : (
            ''
          )}
        </>
      )}
    </div>
  ));
};

export default CardList;
