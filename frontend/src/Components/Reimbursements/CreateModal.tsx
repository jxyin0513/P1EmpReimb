import React from 'react';
import { ModalProvider, Modal } from '../Modal';
import { CreateReimbursement } from './CreateReimbursement';
import { Reimbursement as Reimb } from "./Reimbursements";

interface ReimbursementProps {
    userId:number;
    onClose: () => void;
    setReimb: (reimb:Reimb)=>void;
}
export const CreateModal: React.FC<ReimbursementProps> = ({userId, setReimb, onClose}) => {

    return (
        // <ModalProvider></ModalProvider>
            <div>
                {/* <button onClick={openModal}>Open Modal</button> */}
                {/* {isModalOpen && ()} */}
                    <Modal onClose={onClose}>
                        <CreateReimbursement {...{userId, setReimb, onClose}} />
                    </Modal>
                
            </div>
        
    );
};