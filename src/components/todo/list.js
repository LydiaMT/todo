import React, { useState, useContext } from 'react';
import { SettingsContext } from '../../context/context'
import Button from 'react-bootstrap/Button';
import { When } from 'react-if'
import { FormControl } from 'react-bootstrap'
import useForm from '../../hooks/form.js'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
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
          onClick={() => context.changeSortTo(false)}
          >Sort by Difficulty</Button>
        {props.list.map((item) => 
          // if user clicks pending only button
          // show only items where complete === false
          context.pending ?(
            !item.complete && (
              <Card 
              key={item._id}
              className="shadow p-3 mb-5 bg-white rounded list"
              >
              <Card.Header className="text-secondary">
              <Badge 
                pill variant={item.complete ? "danger" : "success"}
                className="m-3"
                onClick={() => props.toggleComplete(item._id)}  
                >
                {item.complete===true ? `Complete` : `Pending`}
              </Badge>
              <span className="font-weight-bold">{item.assignee}</span>
                <Button 
                  variant="light" 
                  type="submit"
                  onClick={()=> props.deleteItem(item._id)}
                  className="float-right text-secondary font-weight-bold"
                  >
                    X
                  </Button>
              </Card.Header>
              <Card.Body>
                <Card.Text
                  className={`complete-${item.complete.toString()}`}
                  key={item._id}
                  onClick={()=> toggleField(item._id)}             
                  >
                  {item.text}
                </Card.Text>
                <Card.Text className="text-sm-right">
                  Difficulty: {item.difficulty}
                </Card.Text>
              </Card.Body>
            </Card>
            )
            ) : (
              <Card 
              key={item._id}
              className="shadow p-3 mb-5 bg-white rounded list"
              >
              <Card.Header className="text-secondary">
              <Badge 
                pill variant={item.complete ? "danger" : "success"}
                className="m-3"
                onClick={() => props.toggleComplete(item._id)}  
                >
                {item.complete===true ? `Complete` : `Pending`}
              </Badge>
              <span className="font-weight-bold">{item.assignee}</span>
                <Button 
                  variant="light" 
                  type="submit"
                  onClick={()=> props.deleteItem(item._id)}
                  className="float-right text-secondary font-weight-bold"
                  >
                    X
                  </Button>
              </Card.Header>
              <Card.Body>
                <Card.Text
                  className={`complete-${item.complete.toString()}`}
                  key={item._id}
                  onClick={()=> toggleField(item._id)}             
                  >
                  {item.text}
                </Card.Text>
                <Card.Text className="text-sm-right">
                  Difficulty: {item.difficulty}
                </Card.Text>
              </Card.Body>
            </Card>
          )
        )}
      </section>
    </>
  );

}

export default TodoList;
