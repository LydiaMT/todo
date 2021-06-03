import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import './todo.scss';

const todoAPI = 'https://lydia-api-server.herokuapp.com/todo';
// const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const ToDo = () => {

  const [list, setList] = useState([]);

  const _addItem = (item) => {
    item.due = new Date();
    console.log("HI!", JSON.stringify(item))
    fetch(todoAPI, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(savedItem => {
        setList([...list, savedItem]);
      })
      .catch(console.error);
  };

  const _updateItem = (id, val) => {
    let item = list.filter(i => i._id === id)[0] || {};
    if(item._id){
      fetch(`${todoAPI}/${id}`, {
        method: 'put',
        body: JSON.stringify(val)
      })
        .then(response => response.json())
        .then(() => {
          item.text = val
          let newList = list.map(listItem => listItem._id === item._id ? item : listItem);
          setList(newList);
        })
        .catch(console.error);
    }
  };

  const _deleteItem = (id) => {
    let item = list.filter(i => i._id === id)[0] || {};
    if(item._id){
      fetch(`${todoAPI}/${id}`, {
        method: 'delete',
        body: JSON.stringify(item)
      })
        .then(response => response.json())
        .then(() => {
          let newList = list.filter(listItem => listItem._id !== id);
          setList(newList);
        })
        .catch(console.error);
    }
  };

  const _toggleComplete = id => {
    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;
      let url = `${todoAPI}/${id}`;
      fetch(url, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
        .then(response => response.json())
        .then(savedItem => {
          setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
        })
        .catch(console.error);
    }
  };

  const _getTodoItems = () => {
    fetch(todoAPI, {
      method: 'get',
      // mode: 'no-cors',
    })
      .then(data => data.json())
      .then(data => {
        console.log("DATA", data)
        setList(data)
      })
      .catch(console.error);
  };

  useEffect(_getTodoItems, []);

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
              addItem={_addItem}
              updateItem={_updateItem}
              />
          </div>
          <div>
            <TodoList
              list={list}
              toggleComplete={_toggleComplete}
              deleteItem={_deleteItem}
              updateItem={_updateItem}
              />
          </div>
        </section>
      </main>
    </>
  );
};

export default ToDo;
