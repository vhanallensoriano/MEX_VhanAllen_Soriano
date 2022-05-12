import { useState, useEffect } from 'react';
import DeleteConfirm from './DeleteConfirm';
import { Link } from 'react-router-dom';

const TodoList = ({FilterTodos, data}) => {

    const countDone = FilterTodos.filter(item => item.TodoStatus === 'Done').length;
    const countPriority = FilterTodos.filter(item => item.TodoStatus === 'Undone' && item.TodoPriority === 'True').length;
    const [filteredList, setFilteredList] = useState(FilterTodos);
    const [selectedStatus, setSelectedStatus] = useState("");

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
        var filteredData = filterByStatus(FilterTodos);
        setFilteredList(filteredData);
    },[selectedStatus]);
    // filter================================================================== 

    // const handleClickDelete = () => {
    //     fetch('http://localhost:8000/Todos/' + idCount, {
    //         method: 'DELETE'
    //     }).then(() => {
            
    //     }) 
    // }


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
                <Link to={'/AddTodo'}><button>Add Todo</button></Link>
            </div>

            {filteredList.map((item) => (
                <div className="Todo-preview" style={item.TodoStatus === "Done" ? {borderBottom: '1px solid gray' , boxShadow: '1px 3px 5px gray' } : {} && item.TodoPriority === "False" && item.TodoStatus === "Undone" ? {borderBottom: '1px solid #23CE6B' , boxShadow: '1px 3px 5px #23CE6B' } : {}} key={item.id}>
                <p className="todoName" style={item.TodoStatus === "Done" ? {color: 'gray'} : {} && item.TodoPriority === "False" ? {color: '#23CE6B'} : {}}>{item.TodoName}</p>
                <p className="todoStatus" ><Link to={`/DoneConfirm/${item.id}`}><button disabled={item.TodoStatus==="Done"}>Done</button></Link> || <Link to={`/DeleteConfirm/${item.id}`}><button className="todoRemove">Remove</button></Link></p>  
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

// <p className="todoName"  style={item.TodoPriority === "False" ? {color: '#23CE6B'} : {} || item.TodoPriority === "True" ?{color: '#f1356d'} : {} || item.TodoStatus === "Done" ? {color: 'gray'} : {}}>{item.TodoName}</p>