package com.example.ElectroJwt.services;

import com.example.ElectroJwt.dtos.RegisterProductRequest;
import com.example.ElectroJwt.dtos.SignUpRequest;
import com.example.ElectroJwt.dtos.UserDTO;
import com.example.ElectroJwt.models.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface AuthService {
    UserDTO createUser(SignUpRequest signUpRequest);
    //ProductDTO createProduct(RegisterProductRequest registerProductRequest,MultipartFile file);

    User findUserByEmail(String email);


    User findUserByResetPasswordToken(String resetToken);
}
