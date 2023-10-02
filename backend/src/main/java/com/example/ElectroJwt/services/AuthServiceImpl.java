package com.example.ElectroJwt.services;

import com.example.ElectroJwt.dtos.RegisterProductRequest;
import com.example.ElectroJwt.dtos.SignUpRequest;
import com.example.ElectroJwt.dtos.UserDTO;
import com.example.ElectroJwt.models.Product;
import com.example.ElectroJwt.models.User;
import com.example.ElectroJwt.repositories.ProductRepository;
import com.example.ElectroJwt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@Service
public class AuthServiceImpl implements AuthService{
    @Autowired
    private UserRepository userRepository ;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public UserDTO createUser(SignUpRequest signUpRequest) {
        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setName(signUpRequest.getName());
        user.setPhone(signUpRequest.getPhone());
        user.setPassword(new BCryptPasswordEncoder().encode(signUpRequest.getPassword()));
        user.setRole(signUpRequest.getRole());
        User createdUser = userRepository.save(user);
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(createdUser.getEmail());
        userDTO.setName(createdUser.getName());
        userDTO.setPhone(createdUser.getPhone());
        userDTO.setRole(createdUser.getRole());

        return userDTO;

    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findFirstByEmail(email);
    }

    @Override
    public User findUserByResetPasswordToken(String token) {
        return userRepository.findByResetPasswordToken(token);
    }




}
