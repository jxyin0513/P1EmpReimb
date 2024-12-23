import React from 'react';
import { ModalProvider, Modal } from '../Modal';
import { Reimbursement as Reimb } from "./Reimbursements";
import { EditReimbursement } from './EditReimbursement';

interface ReimbursementProps {
    reimb:Reimb;
    onClose: () => void;
    setReimb: (reimb:Reimb)=>void;
}
export const EditModal: React.FC<ReimbursementProps> = ({reimb, setReimb, onClose}) => {

    return (
        // <ModalProvider></ModalProvider>
            <div>
                {/* <button onClick={openModal}>Open Modal</button> */}
                {/* {isModalOpen && ()} */}
                    <Modal onClose={onClose}>
                        <EditReimbursement {...{reimb, setReimb, onClose}} />
                    </Modal>
                
            </div>
        
    );
};