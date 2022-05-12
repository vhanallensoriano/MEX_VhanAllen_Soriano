import { Link } from 'react-router-dom';
import { useHistory,useParams } from "react-router-dom";
import { useState } from 'react/cjs/react.production.min';
import useFetch from "./useFetch";

const DoneConfirm = () => {

    const { id } = useParams();
    const {data} = useFetch('http://localhost:8000/Todos/' + id);
    const history = useHistory();

    let TodoName = (data && data.TodoName);
    let TodoPriority = (data && data.TodoPriority);
    let TodoStatus = "Done";

    const handleClick = () => {
        let itemDone={TodoName,TodoPriority,TodoStatus}
        fetch('http://localhost:8000/Todos/' + data.id, {
          method: 'PUT',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify(itemDone)
        }).then(() => {
          history.push('/Home');
        }) 
      }

    return ( 
        <div className="DonePage">
            <h3>Mark this Todo as Done? - {TodoName}</h3>
            <button onClick={handleClick} >Yes</button>
            <Link to={'/Home'}><button>No</button></Link>
        </div>
     );
}
 
export default DoneConfirm;