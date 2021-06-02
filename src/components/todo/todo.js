import React, { useState, useEffect } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';

// Bootstrap
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
// import Card from 'react-bootstrap/Card'

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import './todo.scss';

function ToDo(props){

  const [list, setList] = useState([])

  useEffect(() => {
    {document.title = `To do List: ${list.length}`}
  })

  const handleSubmit = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  };

  const toggleComplete = id => {
    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;
      let newList = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(newList);
    }
  };

  useEffect(() => {
    {
      let list = [
        { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A'},
        { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A'},
        { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B'},
        { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C'},
        { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B'},
      ];
      setList(list);
    }
  }, [])


  return (
    <>
      <Nav class="p-1 mb-2 bg-primary text-white">
        <Navbar>
          <h1>Home</h1>
        </Navbar>
      </Nav>
      <main>
        <h2 class="p-3 mb-2 bg-dark text-white">
          To Do List Manager ({list.filter(item => !item.complete).length})
        </h2>
        <section className="todo">
          <div>
            <TodoForm handleSubmit={handleSubmit} />
          </div>
          <div>
            <TodoList
              list={list}
              handleComplete={toggleComplete}
            />
          </div>
        </section>
      </main>

    </>
  );

}

export default ToDo;
