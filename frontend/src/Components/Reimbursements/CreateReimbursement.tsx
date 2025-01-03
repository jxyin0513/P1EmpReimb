import axios from "axios"
import { useState } from "react"
import { Reimbursement as Reimb } from "./Reimbursements";
import "./CreateReimbursement.css"

interface Reimbursement{
    description:string
    amount:number
    status?:string | null
    userId:number
}

interface ReimbursementProps {
    userId:number;
    onClose: () => void;
    setReimb: (reimb:Reimb)=>void;
}

export const CreateReimbursement:React.FC<ReimbursementProps> = ({userId, setReimb, onClose})=>{
    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<number>(0.00);
    const [error, setError] = useState<string>("");
    // console.log(userId, onClose);
    const newReimb = async ()=>{
        const reimbursement:Reimbursement = {
            description,
            amount,
            status:"pending",
            userId
        }
        axios.post("http://localhost:4040/reimbursements/new", reimbursement, {withCredentials:true})
        .then((res)=>{
            console.log(res.data);
            setReimb(res.data);
            onClose();
        }).catch(err=>setError(err.response.data));
    }

    return(
        <div className="create-reimb-Container">
            <h2>New Reimbursement</h2>
            <div className="create-reimb-Form">
                <div className="error-handler-Container">
                    {error.length>0 && <div className="error-Reimbs">* {error}</div>}
                </div>
                <div>
                    <input type="number" id="amount" value={amount} placeholder="Enter reimbursement amount" onChange={(e)=>setAmount(Number(e.target.value))}></input>
                </div>
                <div>
                    <input id="descpt" type="text" value={description} placeholder="Describe reimbursement" onChange={(e)=>setDescription(e.target.value)}></input>
                </div>
                <button type="button" className="btn btn-outline-primary btn-sm" onClick={newReimb}>Create</button>
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=>onClose()}>Cancel</button>
            </div>
        </div>
    )
}