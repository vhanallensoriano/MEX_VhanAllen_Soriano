import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import useFetch from "./useFetch";

const TodoList = ({Todos}) => {
    const [disable, setDisable] = useState(false);
    const countDone = Todos.filter(item => item.TodoStatus === 'Done').length;
    const countPriority = Todos.filter(item => item.TodoStatus === 'Undone' && item.TodoPriority === 'True').length;
    const [filteredList, setFilteredList] = useState(Todos);
    const [selectedStatus, setSelectedStatus] = useState("");

    const [TodoName, setTodoName] = useState('');
    const [TodoStatus, setTodoStatus] = useState('Undone');
    const [TodoPriority, setTodoPriority] = useState('True');
    const history = useHistory('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const Todos = { TodoName, TodoStatus, TodoPriority };
    
        fetch('http://localhost:8000/Todos/', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Todos)
        }).then(() => {
            window.location.reload(false);
        })
      }

    //=================================================================================

        const {id} = useParams();
        const { data } = useFetch('http://localhost:8000/Todos/' + id);
        const handleClickDelete = () => {
          fetch('http://localhost:8000/Todos/' + data.id, {
            method: 'DELETE'
          }).then(() => {
            window.location.reload(false);
          }) 
        }

    // filter==================================================================
    const filterByStatus = (filteredData) => {
        // Avoid filter for empty string
    if (!selectedStatus) {
        return filteredData;
    }
    const filteredStatus= filteredData.filter(
        (status) => status.TodoStatus.split(" ").indexOf(selectedStatus) !== -1
    );
        return filteredStatus;
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    useEffect(() => {
        var filteredData = filterByStatus(Todos);
        setFilteredList(filteredData);
    },[selectedStatus]);
    // filter================================================================== 

    

    
    

    return ( 
        <div className="Todo-list">
            <div className="filter"> 
                <select id="status-input" value={selectedStatus} onChange={handleStatusChange}>
                    <option value="">All</option>
                    <option value="Done">Done</option>
                    <option value="Undone">Undone</option>
                </select>
            </div>
            <div className="addTodo">
                <input type="text" required value={TodoName} onChange={(e) => setTodoName(e.target.value)}/>
                <button onClick={handleSubmit}>Add Todo</button>
            </div>
            {filteredList.map((item, index) => (
            <div className="Todo-preview">
                <p className="todoName">{item.TodoName}</p>
                <p className="todoStatus"><button >Done</button> || <button className="todoRemove" onClick={handleClickDelete} >Remove</button></p>  
            </div>
            ))}
            <div className="done">
                <h3>DONE</h3>
                <h1>{countDone}</h1>
            </div>
            <div className="priority">
                <h3>PRIORITY</h3>
                <h1>{countPriority}</h1>
            </div>
            
        </div>
        
     );
}
 
export default TodoList;

// {Todos.filter(Todos => Todos.TodoStatus === (doneStatus)).map(Todo => (
//     <div className="Todo-preview">
//         <p className="todoName">{Todo.TodoName}</p>
//         <p className="todoStatus"><button disabled={disable} onClick={() => setDisable(true)} className="todoRemove">Done</button> || <button className="todoRemove">Remove</button></p>  
//     </div>
//     ))}




// {Todos.map(Todo => (
//     <div className="Todo-preview" key={Todo.TodoId} >
//         <p className="todoName">{Todo.TodoName}</p>
//         <p className="todoStatus"><button disabled={disable} onClick={() => setDisable(true)} className="todoRemove">Done</button> || <button className="todoRemove">Remove</button></p>
//     </div>
// ))}