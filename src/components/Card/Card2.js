import React from 'react';
import { useLocalStore, useObserver } from 'mobx-react-lite';
import './Card.sass';
import SimpleModal from './SimpleModal';

const Card = props => {
  const state = useLocalStore(() => ({
    isOpen: false
  }));

  const openCard = () => {
    state.isOpen = !state.isOpen;
  };

  const info = props.card.stats.map(stat => (
      ` ${stat.stat.name}  :  ${stat.base_stat}`
    ))
  

  return useObserver(() => (
    <div className='Card' onClick={openCard}>
      <div className='image-container'>
        <img
          className='cardimg'
          src={props.card.sprites.front_default}
          alt=''
        />
      </div>
      <div className='pokemonInfo'>
        <p>{props.card.id}</p>
        <h2>{props.card.name}</h2>
        {state.isOpen === true
          ? props.card.stats.map(stat => (
              <div className='pokemonStats'>
                {stat.stat.name + ' : ' + stat.base_stat}
              </div>
            ))
          : ''}
        {props.card.types.map(type => (
          <div className={type.type.name + ' pokemonTypes'}>
            {type.type.name}
          </div>
        ))}
      </div>
      <SimpleModal pokemonStats={info} pokemonImage={props.card.sprites.front_default}/>
    </div>
  ));
};

export default Card;