import { Link } from 'react-router-dom';
import { useHistory,useParams } from "react-router-dom";
import useFetch from "./useFetch";



const DeleteConfirm = () => {

    const { id } = useParams();
    const {data} = useFetch('http://localhost:8000/Todos/' + id);
    const history = useHistory();

    const handleClick = () => {
        fetch('http://localhost:8000/Todos/' + data.id, {
          method: 'DELETE'
        }).then(() => {
          history.push('/Home');
        }) 
      }

    return ( 
        <div className="deletePage">
            <h3>Confirm remove from Todo? - {data && data.TodoName}</h3>
            <button onClick={handleClick} >Yes</button>
            <Link to={'/Home'}><button>No</button></Link>
        </div>
     );
}
export default DeleteConfirm;