package com.example.ElectroJwt.controllers;

import com.example.ElectroJwt.dtos.SignUpRequest;
import com.example.ElectroJwt.dtos.UserDTO;
import com.example.ElectroJwt.models.User;
import com.example.ElectroJwt.repositories.UserRepository;
import com.example.ElectroJwt.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class SignUpUserController {
    @Autowired
    private AuthService authService;
    @PostMapping("/register")
    private ResponseEntity<?> createUser(@RequestBody SignUpRequest signUpRequest){

            UserDTO createduser = authService.createUser(signUpRequest);
            if(createduser == null){
                return new ResponseEntity<>("User Is Not Created , Try again Later ", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(createduser,HttpStatus.CREATED);
            //GHAYA MODIFICATIONS
            //if(signUpRequest.getRole()==1){

            //}
    }
}
