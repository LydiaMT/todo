import React, { useEffect, useState, useContext } from 'react';
import { SettingsContext } from '../../context/context'
import TodoForm from './form.js';
import TodoList from './list.js';
import Pagination from '../pagination.js'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import './todo.scss';

const todoAPI = 'https://lydia-api-server.herokuapp.com/todo';
// const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const ToDo = () => {

  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage] = useState(3)

  const context = useContext(SettingsContext)

  const _addItem = (item) => {
    item.due = new Date();
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
        setList(data)
      })
      .catch(console.error);
  };

  useEffect(_getTodoItems, []);

  const itemsSorted = list.sort((left, right) => {
    console.log("left", left)
    console.log("right", right)
    if(!context.sortList){
      return left.difficulty - right.difficulty
    } 
    return list
  })

  const itemsToShow = itemsSorted.filter((item) => {
    if(!context.pending){
      return true
    } else {
      return !item.complete
    }
  })

  // for Pagination
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const currentPosts = itemsToShow.slice(indexOfFirstPost, indexOfLastPost)

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
              toggleComplete={_toggleComplete}
              deleteItem={_deleteItem}
              updateItem={_updateItem}
              postsPerPage={postPerPage} 
              totalPosts={list.length}
              setCurrentPage={setCurrentPage}
              itemsToShow={currentPosts}
              />
          </div>
          <Pagination 
            postsPerPage={postPerPage} 
            totalPosts={itemsToShow.length}
            setCurrentPage={setCurrentPage}
          />
        </section>
      </main>
    </>
  );
};

export default ToDo;
