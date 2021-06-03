import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import useForm from '../../hooks/form'

function TodoForm(props){
  
  const [ handleSubmit, handleChange ] = useForm(props.addItem)

  // function todo(e){
  //   handleSubmit(e);
  //   handleChange(e);
  // }

  return (
    <>
      <form onSubmit={handleSubmit}>
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
    </>
  );

}

export default TodoForm;
