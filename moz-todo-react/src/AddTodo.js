import { useState } from 'react';
import { useHistory} from "react-router-dom";

const AddTodo = () => {

    const [TodoName, setAddTodoName] = useState('');
    let TodoStatus = "Undone";
    const [TodoPriority, setAddTodoPriority] = useState('True');
    const history = useHistory('');

    const handlePriorityChange = (event) => {
        setAddTodoPriority(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const addNewTodos = { TodoName, TodoStatus, TodoPriority };
    
        fetch('http://localhost:8000/Todos/', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(addNewTodos)
        }).then(() => {
            history.push('/Home');
        })
      }

    return ( 
        <div className="AddPage">
            <h3>Add Todo</h3>
            <input type="text" className="txtUsername" placeholder="Todo name" onChange={event => setAddTodoName(event.target.value)}/>
            <p>Priority</p>
            <select id="status-input" value={TodoPriority} onChange={handlePriorityChange}>
                    <option value="True">True</option>
                    <option value="False">False</option>
            </select>
            <button onClick={handleSubmit}>Add</button>
        </div>
     );
}
 
export default AddTodo;