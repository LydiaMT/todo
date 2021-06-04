import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, setCurrentPage }) => {

  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
    pageNumbers.push(i)
  }

  return(
    <footer>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <button onClick={() => setCurrentPage(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </footer>
  )
}

export default Pagination
