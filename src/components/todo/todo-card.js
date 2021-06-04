import React from 'react';
import Badge from 'react-bootstrap/Badge'
import 'bootstrap/dist/css/bootstrap.min.css'

function TodoCard({item, toggleComplete, deleteItem, toggleField}){

  return (
    <>
      <div className="toast" 
        key={item._id}
        className="shadow mb-3 mr-0 bg-white rounded list"
        >
        <div className="text-secondary toast-header d-flex justify-content-between">
        <div>
          <Badge 
            pill variant={item.complete ? "danger" : "success"}
            className="m-3"
            onClick={() => toggleComplete(item._id)}  
            >
            {item.complete===true ? `Complete` : `Pending`}
          </Badge>
          <span className="font-weight-bold">{item.assignee}</span>
        </div>
        <div>
        <button type="submit" class="close" aria-label="Close"
            onClick={()=> deleteItem(item._id)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        </div>
        <div className="toast-body">
          <p
            className={`complete-${item.complete.toString()}`}
            key={item._id}
            onClick={()=> toggleField(item._id)}             
            >
            {item.text}
          </p>
          <p className="text-sm-right">
            Difficulty: {item.difficulty}
          </p>
        </div>
      </div>
    </>
  )

}

export default TodoCard;
