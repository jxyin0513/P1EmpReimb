import axios from "axios"
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"

export interface User{
    userId:number
    firstName:string
    lastName:string
    username:string
    role: string
}
export const Users:React.FC = ()=>{

    const [users, setUsers] = useState<User []>();

    useEffect(()=>{

        axios.get("http://localhost:4040/users/all")
        .then((res)=>{
            console.log(res);
            setUsers(res.data)
        }).catch((err)=>console.log(err.response.data));
    }, [])
    return(
        <div>
            <h2>Users</h2>
            <Table className="table-primary table-hover">
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
                </thead>
            </Table>

        </div>
    )
}