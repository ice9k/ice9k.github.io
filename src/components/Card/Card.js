import React from 'react';
import { useLocalStore, useObserver } from 'mobx-react-lite';
import './Card.sass';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

const Card = props => {
  const state = useLocalStore(() => ({
    isOpen: false
  }));

  const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  }));

  const classes = useStyles();

  const openCard = () => {
    state.isOpen = true;
  };
  const closeCard = () => {
    state.isOpen = false;
  };
  console.log(state.isOpen);
  return useObserver(() => (
    <>
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
          {props.card.types.map(type => (
            <div className={type.type.name + ' pokemonTypes'}>
              {type.type.name}
            </div>
          ))}
        </div>
      </div>
      <Modal open={state.isOpen} onClose={closeCard} className={classes.modal}>
        <div className={classes.paper + ' mainModal'}>
          <div className='mainModalContainer'>
            <img
              className='MainModalImage'
              src={props.card.sprites.front_default}
              alt=''
            />
            <div className='pokemonStats'>
              {props.card.stats.map(stat => (
                <div>{stat.stat.name + ' : ' + stat.base_stat}</div>
              ))}
            </div>
          </div>
          <div className='additionalImageContainer'>
            <img src={props.card.sprites.back_default} alt='' />
            <img src={props.card.sprites.front_shiny} alt='' />
            <img src={props.card.sprites.back_shiny} alt='' />
          </div>
        </div>
      </Modal>
    </>
  ));
};

export default Card;
