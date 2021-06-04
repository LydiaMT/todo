import React, { useState, useContext } from 'react';
import { SettingsContext } from '../../context/context'
import useForm from '../../hooks/form.js'
import TodoCard from './todo-card.js'
import { When } from 'react-if'
import { FormControl } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'

function TodoList(props){

  const [id, setId] = useState('')
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false);
  const [handleSubmit] = useForm(editTodo)

  const context = useContext(SettingsContext)

  const toggleField = (id) => {
    setOpen(!open)
    setId(id)
  }

  function editTodo(todo){
    setValue(todo)
    props.updateItem(id, value)
  }

  return (
    <>
      <section>
        <When condition={open === true}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Update your item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormControl 
                onChange={(e) => setValue(e.target.value)} 
                placeholder="update todo"/>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={(e) => {handleSubmit(e); toggleField(id)}}>Update</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </When>  
        <Button 
          variant="success"
          onClick={() => context.changePendingTo(!context.pending)}
          >Show Pending Only</Button>
        <Button 
          variant="secondary"
          onClick={() => context.changeSortTo(!context.sortList)}
          >Sort by Difficulty</Button>
        {props.itemsToShow.map((item) => 
          (<TodoCard 
            key={item._id}
            toggleComplete={props.toggleComplete}
            deleteItem={props.deleteItem}
            toggleField={toggleField}
            item={item}
          />)
        )}
      </section>
    </>
  );

}

export default TodoList;
