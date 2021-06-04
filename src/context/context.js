import React, { useState } from 'react'

export const SettingsContext = React.createContext();

function SettingsProvider(props) {
  const [pending , setPending]  = useState(null) //Boolean
  const [sortList, setSortList] = useState('difficulty') //String
  
  const state = {
    pending,
    sortList,
    changePendingTo: setPending,
    changeSortTo: setSortList
  }

  return(
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider;