package com.revature.services;

import com.revature.Repositories.ReimbursementRepository;
import com.revature.Repositories.UserRepository;
import com.revature.models.DTOs.ReimbursementDTO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReimbursementService {
    private final ReimbursementRepository reimbursementRepository;
    private final UserRepository userRepository;

    @Autowired
    public ReimbursementService(ReimbursementRepository reimbursementRepository, UserRepository userRepository) {
        this.reimbursementRepository = reimbursementRepository;
        this.userRepository = userRepository;
    }

    public List<Reimbursement> getAllReimbursements(){
        return reimbursementRepository.findAll(Sort.by(Sort.Direction.ASC, "reimbId"));
    }

    public List<Reimbursement> getReimbursementsByStatus(int userId){
        return reimbursementRepository.findByUser_UserIdAndStatus(userId, "pending");
    }

    public List<Reimbursement> getReimbursementsByUserId(int userId){
        return reimbursementRepository.findByUserUserId(userId);
    }

    public Reimbursement addReimbursement(ReimbursementDTO reimbursementDTO) {
        if(reimbursementDTO.getDescription().isBlank()){
            throw new IllegalArgumentException("Please describe your reimbursement.");
        }
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

    public Reimbursement updateReimbursement(int reimbId, String description, double amount){
        Reimbursement reimbursement = reimbursementRepository.findById(reimbId).orElseThrow(
                ()-> new IllegalArgumentException("Invalid reimbId"));
        if(amount<=0){
            throw new IllegalArgumentException("Enter valid amount");
        }else{
            reimbursement.setAmount(amount);
        }
        if(!description.isBlank()) {
            reimbursement.setDescription(description);
        }else{
            throw new IllegalArgumentException("Please provide description");
        }

        reimbursementRepository.save(reimbursement);
        return reimbursement;
    }

    public Boolean deleteReimbursement(int reimbId){
        Reimbursement reimbursement = reimbursementRepository.findById(reimbId).orElseThrow(()-> new IllegalArgumentException("Can't find a reimbursement"));
        User user = reimbursement.getUser();
        user.getReimbursements().remove(reimbursement);
        userRepository.save(user);
        reimbursementRepository.delete(reimbursement);
        return true;
    }
}
