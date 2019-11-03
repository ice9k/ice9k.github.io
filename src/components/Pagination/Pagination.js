import lodash from 'lodash'
import React from 'react'
import './Pagination.sass'

const Pagination = ({cardsPerPage, totalCards, paginate, setCardsPerPage, currentPage}) => {
    const pageNumbers = Math.ceil(totalCards / cardsPerPage) 
    const pagesToRender = []  
    let tempArr = []
    
     if (pageNumbers >=9) {
        let offset2Right = currentPage +2
        let offset2Left = currentPage -2
        while (offset2Left < 1) {offset2Left++}
        while (offset2Right > pageNumbers) {offset2Right--}
        let offset1Left = offset2Left+1
        let offset1Right = offset2Right-1
        pagesToRender.push(1, offset2Left, offset1Left, currentPage, offset1Right, offset2Right, pageNumbers)
        console.log(offset1Left)
        tempArr = lodash.uniq(pagesToRender)
        
        console.log(tempArr)
    } else { for(let i=pageNumbers; i>0; i--) {tempArr.push(i)
        tempArr.sort((a, b) => a - b);}

    }

        
        

    return (
        <nav className='Pagination'>
            
            {tempArr.map(number => (<div className = { 'pageNumber ' + (currentPage === number? 'ActivePage' : '')} key={number} onClick = {() => {paginate(number) }}>
                    <span href='!#'>{number}</span>
                    
                </div>))}

            
            <select className='Selector' onChange ={event => { setCardsPerPage(event.target.value) 
                paginate(1)}}>
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                    </select>
        </nav>
    )
}
export default Pagination