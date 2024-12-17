package com.revature.services;

import com.revature.Repositories.ReimbursementRepository;
import com.revature.Repositories.UserRepository;
import com.revature.models.DTOs.ReimbursementDTO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReimbursementService {
    private ReimbursementRepository reimbursementRepository;
    private UserRepository userRepository;

    public ReimbursementService(ReimbursementRepository reimbursementRepository, UserRepository userRepository) {
        this.reimbursementRepository = reimbursementRepository;
        this.userRepository = userRepository;
    }

    public List<Reimbursement> getAllReimbursements(){
        return reimbursementRepository.findAll();
    }

    public List<Reimbursement> getReimbursementsByUserId(int userId){
        return reimbursementRepository.findByUserUserId(userId);
    }

    public Reimbursement addReimbursement(ReimbursementDTO reimbursementDTO) {
        Reimbursement reimbursement = new Reimbursement(
                                    0,
                                    reimbursementDTO.getDescription(),
                                    reimbursementDTO.getAmount(),
                                    reimbursementDTO.getStatus(),
                                    null
                                    );
        User user = userRepository.findById(reimbursementDTO.getUserId()).orElseThrow(()->
                                                                new IllegalArgumentException("Invalid userId."));
        reimbursement.setUser(user);
        reimbursementRepository.save(reimbursement);
        return reimbursement;
    }

    public Reimbursement updateReimbursementStatus(int reimbId, String status){
        Reimbursement reimbursement = reimbursementRepository.findById(reimbId).orElseThrow(
                                            ()-> new IllegalArgumentException("Invalid reimbId"));
        if(!status.isBlank()){
            reimbursement.setStatus(status);
        }
        reimbursementRepository.save(reimbursement);
        return reimbursement;
    }

    public Reimbursement updateReimbursementDescription(int reimbId, String description){
        Reimbursement reimbursement = reimbursementRepository.findById(reimbId).orElseThrow(
                ()-> new IllegalArgumentException("Invalid reimbId"));
        if(!description.isBlank()) {
            reimbursement.setDescription(reimbursement.getDescription());
        }
        reimbursementRepository.save(reimbursement);
        return reimbursement;
    }
}
