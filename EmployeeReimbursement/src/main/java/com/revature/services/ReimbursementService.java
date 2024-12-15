package com.revature.services;

import com.revature.Repositories.ReimbursementRepository;
import com.revature.models.Reimbursement;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReimbursementService {
    private ReimbursementRepository reimbursementRepository;

    public ReimbursementService(ReimbursementRepository reimbursementRepository) {
        this.reimbursementRepository = reimbursementRepository;
    }

    public List<Reimbursement> getAllReimbursements(){
        return reimbursementRepository.findAll();
    }

    public List<Reimbursement> getReimbursementsByUserId(int userId){
        return reimbursementRepository.findByUserUserId(userId);
    }

}
