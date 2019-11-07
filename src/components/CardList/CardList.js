import React from 'react';
import './CardList.sass';
import Card from '../Card/Card';


const CardList = ({isLoading, cards}) => {
  const renderCurrentCards = () => {
    const list = cards.map(card => {
      return <Card key={card.id} card={card} />
    });
    return list
  };

  return <div className='CardList'>{renderCurrentCards()}</div>;
};

export default CardList;
