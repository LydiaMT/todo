import React, { useState } from 'react'

export const SettingsContext = React.createContext();

function SettingsProvider(props) {
  const [pending , setPending]  = useState(null) //Boolean
 //Number postPerPage, setPostsPerPage
  const [sort, setSort] = useState('difficulty') //String
  
  // pending = () => setPending()

  const state = {
    pending,
    // currentPage,
    // todoCount,
    sort,
    changePendingTo: setPending,
    // changeCurrentPageTo: setCurrentPage,
    // changeTodoCountTo : setTodoCount,
    changeSortTo: setSort
  }

  return(
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider;