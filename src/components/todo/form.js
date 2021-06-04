import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import useForm from '../../hooks/form'

function TodoForm(props){
  
  const [ handleSubmit, handleChange ] = useForm(props.addItem)

  return (
    <div className="mr-2">
      <form onSubmit={handleSubmit} className="w-100">
      <h3>Add To Do Item</h3>
        <label>
          <span>To Do Item</span>
          <input
            name="text"
            placeholder="Item Details"
            onChange={handleChange}
            />
        </label>
        <label>
          <span>Assigned To</span>
          <input 
            type="text" 
            name="assignee" 
            placeholder="Assignee Name" 
            onChange={handleChange} 
            />
        </label>
        <label>
          <span>Difficulty Rating</span>
          <input 
            defaultValue="1" 
            type="range" 
            min="1" 
            max="5" 
            name="difficulty" 
            onChange={handleChange} 
            />
        </label>
        <Button 
          variant="primary" 
          type="submit">Add Item</Button>
      </form>
    </div>
  );

}

export default TodoForm;
