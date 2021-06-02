import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import ListGroup from 'react-bootstrap/ListGroup'

function TodoList(props){

  return (
    <ul>
      <ListGroup>
        {props.list.map(item => (
            <ListGroup.Item
              className={`complete-${item.complete.toString()}`}
              key={item._id}
              variant={item.complete ? "danger" : "success"}
              onClick={() => props.handleComplete(item._id)} 
            >
              <span>
                {item.text}
              </span>
            </ListGroup.Item>
          ))}
      </ListGroup>  
    </ul>
  );

}

export default TodoList;
