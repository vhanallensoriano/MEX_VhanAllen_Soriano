import useFetch from "./useFetch";
import TodoList from "./TodoList";
import { useHistory, useParams } from "react-router-dom";

const Home = () => {
    const { error, isPending, data} = useFetch('http://localhost:8000/Todos')

    return ( 
        <div className="home">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            {data && <TodoList  FilterTodos={data} />}

        </div>
        
     );
}
 
export default Home;