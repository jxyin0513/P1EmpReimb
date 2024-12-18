import axios from "axios"
import { useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

interface Reimbursement{
    description:string
    amount:number
    status?:string | null
    userId:number
}

export const CreateReimbursement:React.FC = ()=>{
    const navigate = useNavigate()
    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<number>(0.00);

    const newReimb = async ()=>{
        const reimbursement:Reimbursement = {
            description,
            amount,
            status:"pending",
            userId:0
        }
        axios.post("http://localhost:4040/reimbursements/new", reimbursement)
        .then((res)=>{
            console.log(res.data);
            navigate("/")}
        )
        .catch(err=>{err.response.data});
    }

    return(
        <div>
            <h2>Create Reimbursement</h2>
            <div>
                <label htmlFor="descpt">Description: </label>
                <input id="descpt" type="text" value={description} placeholder="Describe reimbursement" onChange={(e)=>setDescription(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="amount">Amount: </label>
                <input type="number" id="amount" value={amount} placeholder="Enter reimbursement amount" onChange={(e)=>setAmount(Number(e.target.value))}></input>
            </div>
            <Button onClick={newReimb}>Create</Button>
        </div>
    )
}