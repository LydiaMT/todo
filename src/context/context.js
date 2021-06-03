import React, { useState } from 'react'

export const SettingsContext = React.createContext();

function SettingsProvider(props) {
  const [pending , setPending]  = useState(null) //Boolean
  const [currentPage, setCurrentPage] = useState(1)
  const [todoCount, setTodoCount] = useState(5) //Number postPerPage, setPostsPerPage
  const [sort, setSort] = useState('difficulty') //String
  
  // pending = () => setPending()

  // const indexOfLastPost = currentPage * todoCount
  // const indexOfFirstPost = indexOfFirstPost - todoCount
  // const currentPosts = item.slice(indexOfFirstPost, indexOfLastPost)

  const state = {
    pending,
    todoCount,
    sort,
    changePendingTo: setPending,
    changeTodoCountTo : setTodoCount,
    changeSortTo: setSort
  }

  return(
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider;