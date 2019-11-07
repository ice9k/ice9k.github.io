import React from 'react';
import './CardList.sass';
import PokemonCard from '../Card/Card';


const CardList = ({ cards}) => {
  const renderCurrentCards = () => {
    const list = cards.map(card => {
      return <PokemonCard key={card.id} card={card} />
    });
    return list
  };

  return <div className='CardList'>{renderCurrentCards()}</div>;
};

export default CardList;
