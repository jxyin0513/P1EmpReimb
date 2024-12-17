import { useState } from "react"

export const LogIn:React.FC = ()=>{

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<String>("");

    return(
        <div>
            <label htmlFor="user">username: </label>
            <input id="user" type="text" value={username} placeholder="Enter your username" onChange={(e)=>setUsername(e.target.value)}></input>
            <label htmlFor="password">password: </label>
            <input type="password" id="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}></input>
        </div>
    )
}