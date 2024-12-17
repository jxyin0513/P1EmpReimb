package com.revature.controllers;

import com.revature.models.User;
import com.revature.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/login")
    public ResponseEntity<User> logInUser(@RequestBody String username, @RequestBody String password){
        if(username.isBlank() || password.isBlank()){
            throw new IllegalArgumentException("Please provide username and password");
        }
        User user = userService.logInUser(username, password);
        return ResponseEntity.status(202).body(user);
    }

    @PostMapping("/create")
    public ResponseEntity<User> addUser(@RequestBody User user){
        return ResponseEntity.ok(userService.addUser(user));
    }

    @PatchMapping("/role/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable int userId, @RequestBody String role){
        User user = userService.updateUserRole(userId, role);
        return ResponseEntity.status(204).body(user);
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable int userId){
        userService.deleteUser(userId);
        return ResponseEntity.status(204).body("Successfully deleted user and its reimbursements.");
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> illegalArgumentException(IllegalArgumentException e){
        return ResponseEntity.badRequest().body(e.getMessage());
    }

}
