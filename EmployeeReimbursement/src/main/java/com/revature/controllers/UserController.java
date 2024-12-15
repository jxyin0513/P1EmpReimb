package com.revature.controllers;

import com.revature.models.User;
import com.revature.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUser(@PathVariable int userId){
        return null;
    }

    @PostMapping("/new")
    public ResponseEntity<User> addUser(@RequestBody User user){
        return ResponseEntity.ok(userService.addUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<User> logInUser(@RequestBody String username, @RequestBody String password){
        if(username.isBlank() || password.isBlank()){
            throw new IllegalArgumentException("Please provide username and password");
        }
        User user = userService.logInUser(username, password);
        return ResponseEntity.status(201).body(user);
    }

    @PatchMapping("/put")
    public ResponseEntity<User> updateUser(User user){
        return null;
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable int userId){
        return null;
    }

}
