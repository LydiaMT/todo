import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { When } from 'react-if'
import { FormControl } from 'react-bootstrap'
import useForm from '../../hooks/form.js'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Modal from 'react-bootstrap/Modal'


function TodoList(props){

  const [id, setId] = useState('')
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false);
  const [handleSubmit] = useForm(editTodo)

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
      <When condition={open === true}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Update your item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl onChange={(e) => setValue(e.target.value)} placeholder="update todo"/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={(e) => {handleSubmit(e); toggleField(id)}}>Update</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </When>  
      {props.list.map((item) => (
        <Card key={item._id}>
          <Card.Header>
          <Badge 
            pill variant={item.complete ? "danger" : "success"}
            onClick={() => props.toggleComplete(item._id)}  
            >
            {item.complete===true ? `Complete` : `Pending`}
          </Badge>
            {item.assignee}
            <Button variant="light" type="submit" onClick={()=> props.deleteItem(item._id)}>X</Button>
          </Card.Header>
          <Card.Body>
            <Card.Text
              className={`complete-${item.complete.toString()}`}
              key={item._id}
              onClick={()=> toggleField(item._id)}             
              >
              {item.text}
            </Card.Text>
            <Card.Text>
              Difficulty: {item.difficulty}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );

}

export default TodoList;
