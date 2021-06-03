import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { When } from 'react-if'
import { FormControl } from 'react-bootstrap'
import useForm from '../../hooks/form.js'


function TodoList(props){


  const [id, setId] = useState('')
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false);
  const [handleSubmit, values] = useForm(editTodo)

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
      
        {props.list.map((item) => (
          <ListGroup horizontal>
            <ListGroup.Item
              className={`complete-${item.complete.toString()}`}
              key={item._id}
              variant={item.complete ? "danger" : "success"}
              onClick={() => props.toggleComplete(item._id)} 
            >
              <span>
                {item.text}
              </span>
            </ListGroup.Item>
            <Button onClick={()=> toggleField(item._id)}>Update</Button>
            <Button type="submit" onClick={()=> props.deleteItem(item._id)}>X</Button>
          </ListGroup>
        ))}
          <When condition={open === true}>
            <Form>
              <FormControl onChange={(e) => setValue(e.target.value)} placeholder="update todo"/>
              <Button onClick={(e) => {handleSubmit(e); toggleField(id)}}>submit</Button>
            </Form>
          </When>  
    </>
  );

}

export default TodoList;
