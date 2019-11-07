import lodash from 'lodash';
import React from 'react';
import './Pagination.sass';

import { useLocalStore, useObserver } from 'mobx-react-lite';

const Pagination = ({ currentPage, allCards, totalCards, pagesCount, cardsPerPage}) => {
  const state = useLocalStore(() => ({
    currentPage: 1,
    cardsPerPage: 10

  }));
  const setCardsPerPage = (number) => (cardsPerPage = number);  
  let tempArr = []
  const pagesToRender = []  
  const paginate = pageNumber => {
    currentPage = pageNumber;
   
  };

  if (pagesCount >= 9) {
    let offset2Right = state.currentPage + 2;
    let offset2Left = state.currentPage - 2;
    while (offset2Left < 1) {
      offset2Left++;
    }
    while (offset2Right > pagesCount) {
      offset2Right--;
    }
    let offset1Left = offset2Left + 1;
    let offset1Right = offset2Right - 1;
    pagesToRender.push(
      1,
      offset2Left,
      offset1Left,
      state.currentPage,
      offset1Right,
      offset2Right,
      pagesCount
    );
    
    tempArr = lodash.uniq(pagesToRender);

    
  } else {
    for (let i = pagesCount; i > 0; i--) {
      tempArr.push(i);
      tempArr.sort((a, b) => a - b);
    }
  }

  return useObserver(() => (
    <nav className='Pagination'>
      {tempArr.map(number => (
        <div
          className={
            'pageNumber ' + (currentPage === number ? 'ActivePage' : '')
          }
          key={number}
          onClick={() => {
            paginate(number);
          }}
        >
          <span href='!#'>{number}</span>
        </div>
      ))}

      <select
        className='Selector'
        onChange={event => {
          setCardsPerPage(event.target.value);
          paginate(1);
        }}
      >
        <option>10</option>
        <option>20</option>
        <option>30</option>
      </select>
    </nav>
  ));
};
export default Pagination;
