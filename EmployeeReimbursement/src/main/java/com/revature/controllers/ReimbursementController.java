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
@CrossOrigin(value = "http://localhost:5173", allowCredentials = "true")
public class ReimbursementController {
// this is just a test to jenkins build
    // why build fails?
    private final ReimbursementService reimbursementService;

    @Autowired
    public ReimbursementController(ReimbursementService reimbursementService) {
        this.reimbursementService = reimbursementService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<Reimbursement>> getAllReimbursements(){
        return ResponseEntity.ok(reimbursementService.getAllReimbursements());
    }
    @GetMapping("/status/{userId}")
    public ResponseEntity<List<Reimbursement>> getReimbursementsByStatus(@PathVariable int userId){
        return ResponseEntity.ok(reimbursementService.getReimbursementsByStatus(userId));
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

    @PatchMapping("/status/{reimbId}")
    public ResponseEntity<Reimbursement> updateReimbursementStatus(@PathVariable int reimbId, @RequestBody String status){
        return ResponseEntity.status(HttpStatus.OK).body(reimbursementService.updateReimbursementStatus(reimbId, status));
    }

    @PatchMapping("/update/{reimbId}")
    public ResponseEntity<Reimbursement> updateReimbursementDescription(@PathVariable int reimbId, @RequestBody Reimbursement reimbursement){
        System.out.println(reimbursement);

        return ResponseEntity.status(HttpStatus.OK).body(reimbursementService.updateReimbursement(reimbId, reimbursement.getDescription(), reimbursement.getAmount()));
    }
    @DeleteMapping("/delete/{reimbId}")
    public ResponseEntity<String> deleteReimbursement(@PathVariable int reimbId){
        reimbursementService.deleteReimbursement(reimbId);
        return ResponseEntity.status(204).body("Successfully deleted a reimbursement.");
    }

//    @ExceptionHandler(IllegalArgumentException.class)
//    public ResponseEntity<String> illegalArgumentException(IllegalArgumentException e){
//        return ResponseEntity.badRequest().body(e.getMessage());
//    }
}
