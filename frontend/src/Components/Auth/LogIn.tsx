import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

interface User{
    firstName?:null
    lastName?:null
    username:string
    password:string
    role?:null
}

export const LogIn:React.FC = ()=>{
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<string []>([]);

    const logIn = async () =>{
        const user:User = {
            firstName:null,
            lastName:null,
            username,
            password,
            role:null
        }
        console.log(user)
        axios.post("http://localhost:4040/users/login", user)
        .then((res)=>console.log(res))
        .catch((e)=>console.log(e.response.data));
    }

    return(
        <div className="login-Container">
            <h2>Welcome to Employee Reimbursement Page</h2>
            <div>
                <label htmlFor="user">username: </label>
                <input id="user" type="text" value={username} placeholder="Enter your username" onChange={(e)=>setUsername(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="password">password: </label>
                <input type="password" id="password" value={password} placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}></input>
            </div>
            <button onClick={logIn}>Log In</button>
            <button onClick={()=>navigate('/signup')}>Sign Up</button>
        </div>
    )
}