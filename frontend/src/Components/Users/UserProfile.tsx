import { useContext, useEffect, useState } from 'react';
import { Reimbursement } from '../Reimbursements/Reimbursements';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { UserContext } from '../Context';
import './UserProfile.css';
import { NavBar } from '../NavBar';
import { CreateModal } from '../Reimbursements/CreateModal';
import { EditModal } from '../Reimbursements/EditModal';

export const UserProfile: React.FC = () => {
    // const location = useLocation();
    const navigate = useNavigate();
    // const user = location.state as User
    const [reimbursements, setReimbursements] = useState<Reimbursement []>([]);
    const [pendingReimb, setPendingReimb] = useState<Reimbursement []>([]);
    const [addReimb, setAddReimb] = useState<boolean>(false);
    const [editReimb, setEditReimb] = useState<boolean>(false);
    const [reimb, setReimb] = useState<Reimbursement>({
        reimbId: 0,
        description: "",
        amount:0,
        status:"",
        user: {
            userId: 0,
            firstName: "",
            lastName: "",
            username: "",
            role: "",
            reimbursements: []
        }
});
    const [pending, setPending] = useState<boolean>(true);
    const {user} = useContext(UserContext);
    console.log(user);

    useEffect(()=>{
        // console.log(user)
        if(!user) {
            navigate("/");
            return;
        }

        axios.get(`http://localhost:4040/reimbursements/${user.userId}`, {withCredentials:true})
        .then((res)=>{
            console.log(res.data);
            setReimbursements(res.data);
        }).catch((err)=>console.log(err.response.data));
    },[])

    useEffect(()=>{
        if(!user || reimbursements.length===0) return;
        const pendingReimb = reimbursements.filter((reimb)=>reimb.status === "pending");
        setPendingReimb([...pendingReimb]);
        // axios.get(`http://localhost:4040/reimbursements/status/${user.userId}`, {withCredentials:true})
        // .then((res)=>{
        //     console.log(res.data);
        //     setPendingReimb(res.data);
        // }).catch((err)=>console.log(err.response.data));
    },[reimbursements])

    const onEditReimb = (reimbursement:Reimbursement)=>{
        setEditReimb(true);
        setReimb(reimbursement);
    }
    const editReimbursement = (reimb:Reimbursement)=>{
        console.log("edit")
        setReimbursements([...reimbursements.map((reimbursement)=>{
            if(reimbursement.reimbId !== reimb.reimbId){
                return reimbursement;
            }else{
                return reimb;
            }
        })
    ])}
    const deleteReimbursement = (id:number)=>{
        axios.delete(`http://localhost:4040/reimbursements/delete/${id}`, {withCredentials:true
        }).then((res)=>{
            console.log(res.data);
            setReimbursements([...reimbursements.filter((reimb)=>reimb.reimbId !== id)]);
        }).catch((err)=>console.log(err.response.data));
    }
    if(!user) return null;

    return (
        <div className="profile-Container">
            <NavBar />
            {user.role==="manager" ? <div className='header-Tags'>
                <Button className='btn btn-danger' onClick={()=>{navigate("/manage/profile")}}><i className="fa-solid fa-user-tie"></i> Admin</Button>
                <h3>Wecome, {user.firstName} {user.lastName}</h3>
            </div>:<h3 className='non-Manager-Header'>Wecome, {user.firstName} {user.lastName}</h3>}
            
            <div className='buttons-Container'>
                <div className='buttons-Reimb'>
                    <Button className={pending? "btn btn-primary":"btn btn-light"} onClick={()=>setPending(true)}><i className="fa-regular fa-clock"></i> Pending</Button>
                    <Button className={!pending? "btn btn-primary":"btn btn-light"} onClick={()=>setPending(false)}><i className="fa-solid fa-file-lines"></i> All Reimbursements</Button>
                </div>
                <div>
                    <Button onClick={()=>setAddReimb(true)}><i className="fa-solid fa-plus"></i> Add Reimbursement</Button>
                    
                </div>
            </div>
            {addReimb && <CreateModal userId={user.userId} setReimb={(reimb:Reimbursement )=>{setReimbursements(()=>[...reimbursements,reimb])}} onClose={()=>setAddReimb(false)} />}
            <h2 className='reimb-Title'>My Reimbursements</h2>
            {pending && <div className='table-Container'>
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
                        {pendingReimb.length >0 ? (pendingReimb.map((reimbursement) => (
                            <tr key={reimbursement.reimbId}>
                                <td>{reimbursement.user.firstName} {reimbursement.user.lastName}</td>
                                <td>${reimbursement.amount}</td>
                                <td>{reimbursement.description}</td>
                                <td >
                                    <div className={reimbursement.status}>{reimbursement.status}</div>
                                </td>
                                <td>
                                    <i onClick={()=>{onEditReimb(reimbursement)}} className="fa-solid fa-pen-to-square fa-lg" id='edit-Reimb'></i>
                                </td>
                            </tr>
                        ))): <tr><td className='no-Reimbursements' colSpan={5}>:)No Pending Reimbursements</td></tr>}
                    </tbody>
                </Table>
            </div>}
            {!pending &&<div className='table-Container'>
                <Table className=''>
                    <thead>
                        <tr className='table-secondary'>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reimbursements.length >0 ? (reimbursements.map((reimbursement) => (
                            <tr key={reimbursement.reimbId}>
                                <td>{reimbursement.user.firstName} {reimbursement.user.lastName}</td>
                                <td>${reimbursement.amount}</td>
                                <td>{reimbursement.description}</td>
                                <td >
                                    <div className={reimbursement.status}>{reimbursement.status}</div>
                                </td>
                                <td>
                                    {<i onClick={()=>deleteReimbursement(reimbursement.reimbId)} className="fa-solid fa-trash" id="reimb-Delete"></i>}
                                </td>
                            </tr>
                        ))): <tr><td className='no-Reimbursements' colSpan={5}>:) No Reimbursements</td></tr>}
                    </tbody>
                </Table>
            </div>}
            {editReimb && <EditModal reimb={reimb} setReimb={(reimb:Reimbursement )=>{editReimbursement(reimb)}} onClose={()=>setEditReimb(false)} />}
        </div>
    );
};

export default UserProfile;