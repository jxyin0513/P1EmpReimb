package com.revature.controllers;

import com.revature.models.DTOs.ReimbursementDTO;
import com.revature.models.Reimbursement;
import com.revature.services.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<Reimbursement> addReimbursement(@RequestBody ReimbursementDTO reimbursementDTO){
        Reimbursement reimbursement = reimbursementService.addReimbursement(reimbursementDTO);
        return ResponseEntity.status(201).body(reimbursement);
    }

    @PatchMapping("/manager/update/{reimbId}")
    public ResponseEntity<Reimbursement> updateReimbursementStatus(@PathVariable int reimbId, @RequestBody String status){
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(reimbursementService.updateReimbursementStatus(reimbId, status));
    }

    @PatchMapping("/description/{reimbId}")
    public ResponseEntity<Reimbursement> updateReimbursementDescription(@PathVariable int reimbId, @RequestBody String description){
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(reimbursementService.updateReimbursementDescription(reimbId, description));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> illegalArgumentException(IllegalArgumentException e){
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
