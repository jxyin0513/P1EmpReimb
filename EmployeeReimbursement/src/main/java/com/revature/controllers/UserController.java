package com.revature.controllers;

import com.revature.Repositories.UserRepository;
import com.revature.aspects.AdminOnly;
import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.models.User;
import com.revature.services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(value = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
// check for 403 No valid crumb error, nothing related to this file.
    @Autowired
    public UserController(UserService userService, UserRepository userRepository) {

        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping("/all")
    @AdminOnly
    public ResponseEntity<List<OutgoingUserDTO>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/login")
    public ResponseEntity<User> logInUser(@RequestBody User user, HttpSession session){
//        System.out.println(username +  password);
        if(user.getUsername().isBlank() || user.getPassword().isBlank()){
//            List<String> errors = new ArrayList<>();
//            errors.add("Please provide username and password");
            throw new IllegalArgumentException("Please provide username and password");
        }
        User userLogIn = userService.logInUser(user.getUsername(), user.getPassword());
        System.out.println("userId" + userLogIn.getUserId() + "role: " +user.getRole());

        session.setAttribute("userId", userLogIn.getUserId());
        session.setAttribute("firstName", userLogIn.getFirstName());
        session.setAttribute("lastName", userLogIn.getLastName());
        session.setAttribute("username", userLogIn.getUsername());
        session.setAttribute("role", userLogIn.getRole());
//        System.out.println(userLogIn);
        return ResponseEntity.status(202).body(userLogIn);
    }

    @PostMapping("/create")
    public ResponseEntity<User> addUser(@RequestBody User user, HttpSession session){
        User newUser = userService.addUser(user);
        session.setAttribute("userId", newUser.getUserId());
        session.setAttribute("firstName", newUser.getFirstName());
        session.setAttribute("lastName", newUser.getLastName());
        session.setAttribute("username", newUser.getUsername());
        session.setAttribute("role", newUser.getRole());
        return ResponseEntity.ok(newUser);
    }

    @PatchMapping("/role/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable int userId, @RequestBody String role){
        User user = userService.updateUserRole(userId, role);
        return ResponseEntity.status(200).body(user);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<String> logOutUser(HttpSession session){
        System.out.println(session.getAttribute("userId"));
        User user = userRepository.findById((int)session.getAttribute("userId")).orElseThrow(()-> new IllegalArgumentException("Invalid userId."));
        System.out.println(user);
        session.setAttribute("userId", null);
        session.setAttribute("firstName", null);
        session.setAttribute("lastName", null);
        session.setAttribute("username", null);
        session.setAttribute("role", null);
        return ResponseEntity.status(204).body("Successfully deleted user and its reimbursements.");
    }


    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable int userId){
        userService.deleteUser(userId);
        return ResponseEntity.status(204).body("Successfully deleted user and its reimbursements.");
    }

//    @ExceptionHandler(IllegalArgumentException.class)
//    public ResponseEntity<String> illegalArgumentException(IllegalArgumentException e){
//        return ResponseEntity.badRequest().body(e.getMessage());
//    }

}
