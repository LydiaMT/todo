import React from 'react';
import ToDo from './components/todo/todo-connected.js';
import SettingsContext from './context/context'
import 'bootstrap/dist/css/bootstrap.min.css'

function App () {
  return (
    <>
    <SettingsContext>
      <ToDo />
    </SettingsContext>
    </>
  );
}

export default App