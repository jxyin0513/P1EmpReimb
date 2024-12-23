import axios from "axios";
import { useContext, useState } from "react";
// import { Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './SignUp.css';
import { NavBar } from "../NavBar";
import { UserContext } from "../Context";

interface UserSignUp{
    firstName:string
    lastName:string
    username:string
    password:string
    role?:string
}
export const SignUp:React.FC = ()=>{
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [error, setError] = useState<string>("");
    const {setUser} = useContext(UserContext);
    const signUp = async () =>{
        const user:UserSignUp = {
            firstName,
            lastName,
            username,
            password,
            role: "employee"
        }
        axios.post("http://localhost:4040/users/create", user, {withCredentials: true})
        .then((res)=>{
            console.log(res);
            setUser(res.data);
            navigate("/user/reimbursements")
        }).catch((e)=>{setError(e.response.data)})
    }

    return(
        <div className="signUp-Container">
            <NavBar />
            <h2>Sign Up</h2>
            <div className="signUp-Outer">
            <div className="signUp-Form">
                <div className="error-handler-Container">
                    {error.length>0 && <div className="error">*{error}</div>}
                </div>
                <div>
                    <input id="firstname" type="text" value={firstName} placeholder="Enter your first name" onChange={(e)=>setFirstName(e.target.value)}></input>
                </div>
                <div>
                    <input type="text" id="lastname" value={lastName} placeholder="Enter your last name" onChange={(e)=>setLastName(e.target.value)}></input>
                </div>
                <div>
                    <input id="username" type="text" value={username} placeholder="Enter your username" onChange={(e)=>setUsername(e.target.value)}></input>
                </div>
                <div>
                    <input type="password" id="password" value={password} placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}></input>
                </div>
                <div>
                    {/* <input id="role" type="text" value={role} placeholder="Enter your role" onChange={(e)=>setRole(e.target.value)}></input> */}
                    <select name="role" id="role" value={role} onChange={(e)=>setRole(e.target.value)}>
                        <option value={""} disabled>Select your role ------</option>
                        <option value={"employee"}>Employee</option>
                        <option value={"manager"}>Manager</option>
                    </select>
                </div>
                
                <button onClick={signUp}>Sign Up</button>
                <div>-------already a user? ---- <button onClick={()=>navigate("/")}>Log In</button> ----</div>
            </div>
            </div>
        </div>
    )
}