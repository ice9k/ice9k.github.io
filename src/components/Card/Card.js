import React from 'react';
import { useLocalStore, useObserver } from 'mobx-react-lite';
import './Card.sass';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const PokemonCard = props => {
  const state = useLocalStore(() => ({
    isOpen: false
  }));

  const useCardStyles = makeStyles({
    card: {
      minWidth: 200
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)'
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  });

  const useModalStyles = makeStyles(theme => ({
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

  const modalClasses = useModalStyles();
  const cardClasses = useCardStyles();

  const openCard = () => {
    state.isOpen = true;
  };
  const closeCard = () => {
    state.isOpen = false;
  };

  return useObserver(() => (
    <>
      <Card className={cardClasses.card + ' PokemonCard'} onClick={openCard}>
        <CardContent>
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
        </CardContent>
      </Card>
      <Modal
        open={state.isOpen}
        onClose={closeCard}
        className={modalClasses.modal}
      >
        <div className={modalClasses.paper + ' mainModal'}>
          <div className='mainModalContainer'>
            <img
              className='MainModalImage'
              src={props.card.sprites.front_default}
              alt=''
            />
            <div className='pokemonStats'>
              <h2>{props.card.name.toUpperCase()}</h2>
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

export default PokemonCard;
