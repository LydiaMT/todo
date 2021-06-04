import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import 'bootstrap/dist/css/bootstrap.min.css'

function TodoCard({item, toggleComplete, deleteItem, toggleField}){

  return (
    <>
      <Card 
        key={item._id}
        className="shadow p-3 mb-5 bg-white rounded list"
        >
        <Card.Header className="text-secondary">
        <Badge 
          pill variant={item.complete ? "danger" : "success"}
          className="m-3"
          onClick={() => toggleComplete(item._id)}  
          >
          {item.complete===true ? `Complete` : `Pending`}
        </Badge>
        <span className="font-weight-bold">{item.assignee}</span>
          <Button 
            variant="light" 
            type="submit"
            onClick={()=> deleteItem(item._id)}
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
    </>
  )

}

export default TodoCard;
