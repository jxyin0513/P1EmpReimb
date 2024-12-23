import axios from "axios"
import { useEffect , useState} from "react"
import { Table } from "react-bootstrap"
import { User } from "../Users/ManagerProfile"

export interface Reimbursement{
    reimbId:number
    description:string
    amount:number
    status:string
    user: User
}

export const Reimbursements:React.FC = ()=>{

    const [reimbursements, setReimbursements] = useState<Reimbursement []>()

    useEffect(()=>{
        axios.get(`http://localhost:4040/reimbursements/`, {withCredentials: true})
        .then((res)=>{
            console.log(res.data);
            setReimbursements(res.data);
        }).catch((err)=>console.log(err.response.data))
    },[])

    return (
        <div>
            <h2>Reimbursements list</h2>
            <Table className="table-primary table-hover">
                <thead>
                    <tr>
                        <th>Reimbursement Id</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>User Name</th>
                    </tr>
                </thead>
            </Table>
        </div>
    )
}