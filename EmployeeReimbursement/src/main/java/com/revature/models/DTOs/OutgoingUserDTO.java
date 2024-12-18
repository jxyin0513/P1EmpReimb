package com.revature.models.DTOs;

import com.revature.models.Reimbursement;

import java.util.List;

public class OutgoingUserDTO {
    private int userId;
    private String firstName;
    private String lastName;
    private String role;
    private String username;
    private List<Reimbursement> reimbursements;

    public OutgoingUserDTO() {
    }

    public OutgoingUserDTO(int userId, String firstName, String lastName, String role, String username, List<Reimbursement> reimbursements) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.username = username;
        this.reimbursements = reimbursements;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<Reimbursement> getReimbursements() {
        return reimbursements;
    }

    public void setReimbursements(List<Reimbursement> reimbursements) {
        this.reimbursements = reimbursements;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "OutgoingUserDTO{" +
                "userId=" + userId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", role='" + role + '\'' +
                ", username='" + username + '\'' +
                ", reimbursements=" + reimbursements +
                '}';
    }
}
