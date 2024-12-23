import axios from "axios";
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { User as LoggedInUser } from "../Users/ManagerProfile";
import { UserContext } from "../Context";
import "./LogIn.css";
import { NavBar } from "../NavBar";

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
    const [error, setError] = useState<string>("");
    const {user, setUser} = useContext(UserContext);

    // console.log(user, updateUser)
    const logIn = async () =>{
        const user:User = {
            firstName:null,
            lastName:null,
            username,
            password,
            role:null
        }
        // console.log(user)
        axios.post("http://localhost:4040/users/login", user, {withCredentials:true})
        .then((res)=>{
            // console.log(res.data.role)
            // if(res.data.role === "employee"){
                console.log(res.data);
                setUser(res.data);
                navigate("/user/reimbursements")
            // }else if(res.data.role === "manager"){
            //     console.log(res.data);
            //     setUser(res.data);
            //     navigate("/manager/reimbursements")
            // }
        }).catch((e)=>setError(e.response.data));
    }

    return(
        <div className="login-Container">
            <NavBar />
            <h2>Welcome to Employee Reimbursement Center</h2>
            <div className="login-Form">
                <div className="error-handler-Container">
                    {error.length>0 && <div className="error">*{error}</div>}
                </div>
                <div>
                    <input id="user" type="text" value={username} placeholder="Enter your username" onChange={(e)=>setUsername(e.target.value)}></input>
                </div>
                <div>
                    <input type="password" id="password" value={password} placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}></input>
                </div>
                <div>
                    <button onClick={logIn}>Log In</button>
                    <button onClick={()=>navigate('/signup')}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}