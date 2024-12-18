import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserSignUp{
    firstName:string
    lastName:string
    username:string
    password:string
    role?:string | null
}
export const SignUp:React.FC = ()=>{
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [errors, setErrors] = useState<string []>();

    const signUp = async () =>{
        const user:UserSignUp = {
            firstName,
            lastName,
            username,
            password,
            role: role.length>0? role:null
        }
        axios.post("http://localhost:4040/users/create", user)
        .then((res)=>{
            console.log(res);
            navigate("/")
        }).catch((e)=>{console.log(e)})
    }

    return(
        <div>
            <h2>Sign Up</h2>
            <div>
                <label htmlFor="firstname">First Name: </label>
                <input id="firstname" type="text" value={firstName} placeholder="Enter your first name" onChange={(e)=>setFirstName(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="lastname">Last Name: </label>
                <input type="text" id="lastname" value={lastName} placeholder="Enter your last name" onChange={(e)=>setLastName(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="username">Username: </label>
                <input id="username" type="text" value={username} placeholder="Enter your username" onChange={(e)=>setUsername(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" value={password} placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="role">Role: </label>
                {/* <input id="role" type="text" value={role} placeholder="Enter your role" onChange={(e)=>setRole(e.target.value)}></input> */}
                <select name="role" id="role" value={role} onChange={(e)=>setRole(e.target.value)}>
                    <option value={""} disabled>Select your role ------</option>
                    <option value={"employee"}>Employee</option>
                    <option value={"manager"}>Manager</option>
                </select>
            </div>
            
            <button onClick={signUp}>Sign Up</button>
        </div>
    )
}