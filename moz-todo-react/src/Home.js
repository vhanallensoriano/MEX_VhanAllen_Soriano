import TodoList from "./TodoList";
import useFetch from "./useFetch";

const Home = () => {

    const { error, isPending, data: Todos } = useFetch('http://localhost:8000/Todos')

    return ( 
        <div className="home">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            {Todos && <TodoList  Todos={Todos} />}

        </div>
        
     );
}
 
export default Home;