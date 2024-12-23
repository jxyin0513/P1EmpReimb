import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./ManagerProfile";
import { UserContext } from "../Context";
import axios from "axios";
import { Table } from "react-bootstrap";
import "./ManageUsers.css";

export const ManageUsers: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User []>([]);
    const {user:logInUser} = useContext(UserContext);
    console.log(logInUser)
    useEffect(()=>{
        if(!logInUser) {
            navigate("/");
            return;
        }
        const manageUser = async()=>{
        await axios.get("http://localhost:4040/users/all", {withCredentials: true})
        .then((res)=>{
            console.log(res);
            setUsers(res.data)
        }).catch((err)=>console.log(err.response.data));
    }
        manageUser();    
    }, []);

    const onManager = async (id:number)=>{
        await axios.patch(`http://localhost:4040/users/role/${id}`, "manager", { withCredentials:true, headers:{"Content-Type": "text/plain"}
    }).then((res)=>{
        console.log(res.data);
        setUsers([...users.map((user)=>{
            if(user.userId !== id){
                return user;
            }else{
                return res.data
            }
        })]);
    }).catch((err)=>console.log(err.response.data));
}

    const onDelete = (id:number)=>{
        axios.delete(`http://localhost:4040/users/delete/${id}`, {withCredentials:true, headers:{ "Content-Type": "text/plain"
        }}).then((res)=>{
            console.log(res.data);
            setUsers([...users.filter((user)=>user.userId !== id)]);
        }).catch((err)=>console.log(err.response.data));
    }
    
    return (
        <div className="manage-Users-Container">
            <h2>Employees</h2>
            <div className="table-Container">
                <Table className="">
                    <thead>
                        <tr className="table-secondary">
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (users.map((user)=>(
                            <tr key={user.userId}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.username}</td>
                                <td>{user.role}</td>
                                <td>
                                    {user.role!=="manager"&&user.userId!==logInUser?.userId? 
                                    <>
                                        <i onClick={()=>onManager(user.userId)} id="user-Promote" className="fa-solid fa-handshake-angle fa-lg"></i>
                                        <i onClick={()=>onDelete(user.userId)} className="fa-solid fa-user-minus fa-lg" id="delete-User"></i>
                                    </>:<i id="user-Promote"></i>}
                                    {/* {user.userId!==logInUser?.userId && <i onClick={()=>onDelete(user.userId)} className="fa-solid fa-user-minus fa-lg" id="delete-User"></i>} */}
                                    {user.userId===logInUser?.userId && <i style={{paddingLeft:"10px"}} >N/A</i>}
                                </td>
                            </tr>
                        ))): <tr><td className="no-Reimbursements" colSpan={5}>:)No users</td></tr>}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}