import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import { Reimbursement } from "../Reimbursements/Reimbursements"
import { UserContext } from "../Context"
import { NavBar } from "../NavBar"
import { useNavigate } from "react-router-dom";
import './ManagerProfile.css'
import { ManageUsers } from "./ManageUsers"

export interface User{
    userId:number
    firstName:string
    lastName:string
    username:string
    role: string
    reimbursements: Reimbursement[]
}
export const ManagerProfile:React.FC = ()=>{
    const navigate = useNavigate();
    const [reimbursements, setReimbursements] = useState<Reimbursement []>([]);
    const [pendingReimbs, setPendingReimbs] = useState<Reimbursement []>([]);
    const [pending, setPending] = useState<boolean>(true);
    const [checkUsers, setCheckUsers] = useState<boolean>(false);
    const {user} = useContext(UserContext);
    
    useEffect(()=>{
        if(!user) {
            navigate("/");
            return;
        }
        const managerPage = async()=>{
            await axios.get(`http://localhost:4040/reimbursements/all`, {withCredentials:true})
            .then((res)=>{
                console.log(res.data);
                setReimbursements(res.data);
            }).catch((err)=>console.log(err.response.data))
        }
        managerPage()
    }, []);

    useEffect(()=>{
        if(!user || reimbursements.length===0) return;
        const pendingReimb = reimbursements.filter((reimb)=>reimb.status === "pending");
        setPendingReimbs([...pendingReimb]);
    },[reimbursements])

    const statusUpdateFunc  = async (id:number, status:string)=>{
        await axios.patch(`http://localhost:4040/reimbursements/status/${id}`, status, {
            withCredentials:true,
            headers:{
                "Content-Type": "text/plain"
        }}).then((res)=>{
            console.log(res.data);
            setReimbursements([...reimbursements.map((reimb)=>{
                if(reimb.reimbId !== id){
                    return reimb;
                }else{
                    return res.data
                }
            })]);
            }).catch((err)=>console.log(err.response.data));
    }

    const deleteReimb = async (id:number)=>{
        await axios.delete(`http://localhost:4040/reimbursements/delete/${id}`, {withCredentials:true
        }).then((res)=>{
            console.log(res.data);
            setReimbursements([...reimbursements.filter((reimb)=>reimb.reimbId !== id)]);
        }).catch((err)=>console.log(err.response.data));
    }

    const onUser = ()=>{ setCheckUsers(true); setPending(false)};
    const onPending = ()=>{ setPending(true); setCheckUsers(false)};
    const onAllReimbs = ()=>{ setPending(false); setCheckUsers(false)};

    if(!user) return null;
    
    return(
        <div className="manager-Container">
            <NavBar />
            <div className="header-Tags">
                <Button onClick={()=>navigate("/user/reimbursements")}>Back</Button>
                <h3>Wecome, {user?.firstName} {user?.lastName}</h3>
            </div>
            {/* <h2>Users</h2> */}
            <div className="buttons-Container">
                <Button className={checkUsers && !pending? "btn btn-primary":"btn btn-light"} onClick={onUser}><i className="fa-solid fa-user"></i> Users</Button>
                <div className="all-Reimb-Buttons">
                    <Button className={pending && !checkUsers? "btn btn-primary":"btn btn-light"} onClick={onPending}><i className="fa-regular fa-clock"></i> Pending</Button>
                    <Button className={!pending && !checkUsers? "btn btn-primary":"btn btn-light"} onClick={onAllReimbs}><i className="fa-solid fa-file-lines"></i> All Reimbursements</Button>
                </div>
            </div>
            {!checkUsers && <div>
            {pending? <h2>Pending Reimbursements</h2>:<h2>All Reimbursements</h2>}
            <div className="table-Container"> 
                <Table className=''>
                    <thead>
                        <tr className='table-secondary'>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reimbursements.length >0 && (reimbursements.map((reimbursement) => {
                            if(pending && reimbursement.status ==="pending" && user?.userId!==reimbursement.user.userId){
                            return (
                            <tr key={reimbursement.reimbId}>
                                <td>{reimbursement.user.firstName} {reimbursement.user.lastName}</td>
                                <td>${reimbursement.amount}</td>
                                <td>{reimbursement.description}</td>
                                <td >
                                    <div className={reimbursement.status}>{reimbursement.status}</div>
                                </td>
                                <td className="reimb-Options">
                                    {user?.userId!==reimbursement.user.userId &&
                                    <>
                                        <i onClick={()=>statusUpdateFunc(reimbursement.reimbId, "approved")} className="fa-solid fa-square-check fa-xl" id="reimb-Approve"></i>
                                        {/* <i className="fa-solid fa-check-to-slot fa-xl"></i>
                                        <i className="fa-solid fa-x fa-xl"></i> */}
                                        <i onClick={()=>statusUpdateFunc(reimbursement.reimbId, "denied")} className="fa-solid fa-square-xmark fa-xl" id="reimb-Deny"></i>
                                    </>}
                                </td>
                            </tr>
                        )}else if(!pending){
                            return (
                                <tr key={reimbursement.reimbId}>
                                    <td>{reimbursement.user.firstName} {reimbursement.user.lastName}</td>
                                    <td>${reimbursement.amount}</td>
                                    <td>{reimbursement.description}</td>
                                    <td >
                                        <div className={reimbursement.status}>{reimbursement.status}</div>
                                    </td>
                                    <td className="reimb-Options">
                                        {user?.userId!==reimbursement.user.userId && reimbursement.status==="pending" &&
                                        <>
                                            <i onClick={()=>statusUpdateFunc(reimbursement.reimbId, "approved")} className="fa-solid fa-square-check fa-xl" id="reimb-Approve"></i>
                                            {/* <i className="fa-solid fa-check-to-slot fa-xl"></i>
                                            <i className="fa-solid fa-x fa-xl"></i> */}
                                            <i onClick={()=>statusUpdateFunc(reimbursement.reimbId, "denied")} className="fa-solid fa-square-xmark fa-xl" id="reimb-Deny"></i>
                                        </>}
                                        {(reimbursement.status!=="pending") && <i onClick={()=>deleteReimb(reimbursement.reimbId)} className="fa-solid fa-trash" id="reimb-Delete"></i>}
                                    </td>
                                </tr>
                            )
                        }}))}
                        {pendingReimbs.length===0 && pending && <tr><td className="no-Reimbursements" colSpan={5}>:) No Pending reimbursements</td></tr>}
                        {reimbursements.length===0 && !pending && <tr><td className="no-Reimbursements" colSpan={5}>:) No Reimbursements</td></tr>}
                    </tbody>
                </Table>
            </div>
            </div>}
            {checkUsers && <ManageUsers />}
        </div>
    )
}