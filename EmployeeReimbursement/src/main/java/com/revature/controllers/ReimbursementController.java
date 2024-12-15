package com.revature.controllers;

import com.revature.models.Reimbursement;
import com.revature.services.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reimbursements")
public class ReimbursementController {

    private ReimbursementService reimbursementService;

    @Autowired
    public ReimbursementController(ReimbursementService reimbursementService) {
        this.reimbursementService = reimbursementService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Reimbursement>> getAllReimbursements(){
        return ResponseEntity.ok(reimbursementService.getAllReimbursements());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Reimbursement>> getReimbursementsByUserId(@PathVariable int userId){
        return ResponseEntity.ok(reimbursementService.getReimbursementsByUserId(userId));
    }

    @PostMapping("/new")
    public ResponseEntity<Reimbursement> addReimbursement(){
        return null;
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Boolean> deleteReimbursement(@PathVariable int userId){
        return null;
    }
}
