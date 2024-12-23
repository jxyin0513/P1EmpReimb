import axios from "axios"
import { useState } from "react"
import { Reimbursement } from "./Reimbursements";
import "./EditReimbursement.css"

interface ReimbursementProps {
    reimb:Reimbursement ;
    onClose: () => void;
    setReimb: (reimb:Reimbursement)=>void;
}

export const EditReimbursement:React.FC<ReimbursementProps> = ({reimb, setReimb, onClose})=>{
    const [description, setDescription] = useState<string>(reimb.description);
    const [amount, setAmount] = useState<number>(reimb.amount);
    const [error, setError] = useState<string>("");
    // console.log(userId, onClose);
    const newReimb = async ()=>{
        const reimbursement:Reimbursement = {
            reimbId: reimb.reimbId,
            description,
            amount,
            status:reimb.status,
            user:reimb.user
        }
        axios.patch(`http://localhost:4040/reimbursements/update/${reimb.reimbId}`, reimbursement, {withCredentials:true})
        .then((res)=>{
            console.log(res.data);
            setReimb(res.data);
            onClose();
        }).catch(err=>setError(err.response.data));
    }

    return(
        <div className="edit-reimb-Container">
            <h2>Edit Reimbursement</h2>
            <div className="edit-reimb-Form">
                <div className="error-handler-Container">
                    {error.length>0 && <div className="error-Reimbs">* {error}</div>}
                </div>
                <div>
                    <input type="number" id="amount" value={amount} placeholder="Enter reimbursement amount" onChange={(e)=>setAmount(Number(e.target.value))}></input>
                </div>
                <div>
                    <input id="descpt" type="text" value={description} placeholder="Describe reimbursement" onChange={(e)=>setDescription(e.target.value)}></input>
                </div>
                <button type="button" className="btn btn-outline-primary btn-sm" onClick={newReimb}>Edit</button>
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=>onClose()}>Cancel</button>
            </div>
        </div>
    )
}