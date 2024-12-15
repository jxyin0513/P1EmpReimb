package com.revature.services;

import com.revature.Repositories.UserRepository;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addUser(User user){
        if(user.getFirstName()==null || user.getFirstName().isBlank()){
            throw new IllegalArgumentException("Enter your first name.");
        }
        if(user.getLastName()==null || user.getLastName().isBlank()){
            throw new IllegalArgumentException("Enter your last name.");
        }
        if(user.getUsername()==null || user.getUsername().isBlank()){
            throw new IllegalArgumentException("Enter your user name.");
        } else if (userRepository.findByUsername(user.getUsername())!=null) {
            throw new IllegalArgumentException("Username already in use");
        }
        if(user.getPassword()==null || user.getPassword().length()<=4){
            throw new IllegalArgumentException("Password must be greater than 4 characters.");
        }
        return userRepository.save(user);
    }

    public User logInUser(String username, String password){
        User user = userRepository.findByUsername(username);
        if(user==null){
            throw new IllegalArgumentException("No such username" + " "+ username);
        }
        if(user.getPassword() != password){
            throw new IllegalArgumentException("Password incorrect");
        }
        return user;
    }
}
