import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from "react-router-dom";
import useFetch from './useFetch';

const Login = () => {
    let username = 'admin'
    let password = 'admin'

    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch('http://localhost:8000/Todos/' + id);
    
    const handleClickDelete = () => {
        fetch('http://localhost:8000/Todos/' + blog.id, {
          method: 'DELETE'
        }).then(() => {
            
        }) 
    }

    const [verifyUsername, setVerifyUsername] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [isVerify, setIsVerify] = useState(false);
    const history = useHistory();

    const veryfyLogin = () =>{
        (verifyUsername !== (username) || verifyPassword !== (password)) && alert('Incorrect username or password');
        (verifyUsername === (username) && verifyPassword === (password)) && setIsVerify(true);
    }

    return (  
        <div className="LoginPage">
            <input type="text" className="txtUsername" placeholder="username" onChange={event => setVerifyUsername(event.target.value)}/>
            <input type="text" className="txtPassword" placeholder="password" onChange={event => setVerifyPassword(event.target.value)}/>
            <Link to={isVerify && (history.push('/Home'))}><button onClick={veryfyLogin} className="btnSignin" >Sign in</button></Link>
            <p className="forgotPassword">Forgot Password?</p>
            <p className="register">Register</p>
        </div>
    );
}
 
export default Login;