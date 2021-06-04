import React, { useState, useEffect } from 'react';
// import { SettingsContext } from '../../context/context'
import TodoForm from './form.js';
// import TodoList from './list.js';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import './todo.scss';

function ToDo(props){

  const [item, setItem] = useState({})
  const [list, setList] = useState([])


  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  };

  const deleteItem = id => {
    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
      let newList = list.filter(listItem => listItem._id !== id);
      setList(newList);
    }
  }

  const updateItem = (id, val) => {
    let item = list.filter(i => i._id === id)[0] || {};
    if(item._id){
      item.text = val
      let newList = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(newList);
    }
  }

  const toggleComplete = id => {
    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;
      let newList = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(newList);
    }
  };

  useEffect(() => {
    document.title = `To do List: ${list.filter(i => !i.complete).length}`
  }, [list])

  useEffect(() => {
    let list = [
      { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A'},
      { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A'},
      { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B'},
      { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C'},
      { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B'},
    ];
    setList(list);
  }, [])

  // const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <Nav className="p-1 mb-2 bg-primary text-white">
        <Navbar>
          <h1>Home</h1>
        </Navbar>
      </Nav>
      <main>
        <h2 className="p-3 mb-2 bg-dark text-white">
          To Do List Manager ({list.filter(item => !item.complete).length})
        </h2>
        <section className="todo">
          <div>
            <TodoForm 
              addItem={addItem}
              />
          </div>
          <div>
            <TodoList
              list={list}
              toggleComplete={toggleComplete}
              deleteItem={deleteItem}
              updateItem={updateItem}
              />
          </div>
        </section>
      </main>
    </>
  );

}

export default ToDo;
