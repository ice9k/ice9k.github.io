import lodash from 'lodash';
import React from 'react';
import './Pagination.sass';

import { useObserver } from 'mobx-react-lite';

const Pagination = props => {
  let tempArr = [];
  const pagesToRender = [];

  if (props.pagesCount >= 9) {
    let offset2Right = props.currentPage + 2;
    let offset2Left = props.currentPage - 2;
    while (offset2Left < 1) {
      offset2Left++;
    }
    while (offset2Right > props.pagesCount) {
      offset2Right--;
    }
    let offset1Left = offset2Left + 1;
    let offset1Right = offset2Right - 1;
    pagesToRender.push(
      1, '...',
      offset2Left,
      offset1Left,
      props.currentPage,
      offset1Right,
      offset2Right,
      '..>',
      props.pagesCount
    );

    tempArr = lodash.uniq(pagesToRender);
  } else {
    for (let i = props.pagesCount; i > 0; i--) {
      tempArr.push(i);
      tempArr.sort((a, b) => a - b);
    }
  }
  return useObserver(() => (
    <nav className='Pagination'>
      {tempArr.map(number => (
        <div
          className={
            'pageNumber ' + (props.currentPage === number ? 'ActivePage' : '')
          }
          key={number}
          onClick={() => {
            props.paginate(number);
          }}
        >
          <span href='!#'>{number}</span>
        </div>
      ))}

      <select
        className='Selector'
        onChange={event => {
          props.setCardsPerPage(event.target.value);
          props.paginate(1);
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
