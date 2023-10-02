package com.example.ElectroJwt.controllers;


import com.example.ElectroJwt.models.User;
import com.example.ElectroJwt.repositories.UserRepository;
import com.example.ElectroJwt.services.AuthServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;


@CrossOrigin(origins = "*")
@RestController
public class ForgotPasswordController {

    String ResetToken;
    @Autowired
    JavaMailSender javaMailSender;
    @Autowired
    UserRepository repo;
    @Autowired
    AuthServiceImpl authServiceImpl;
    @GetMapping("/forgotPassword/{email}")
    public String findUserByEmail(@PathVariable String email, HttpServletRequest request){
        User user = authServiceImpl.findUserByEmail(email);
        String appUrl = request.getScheme() + "://" + request.getServerName() + ":4200/reset?Token=";
       if(user == null){
           return "user didn't found";
        }
        ResetToken = UUID.randomUUID().toString();
        user.setResetPasswordToken(ResetToken);
        user.setDateResetPasswordToken(new Date(System.currentTimeMillis()));
        repo.save(user);
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("amohamedamine01@gmail.com");
        simpleMailMessage.setTo(user.getEmail());
        simpleMailMessage.setSubject("Password Reset Request");
        simpleMailMessage.setText("click the link below to reset your password:\n" + appUrl +
                  user.getResetPasswordToken());
        javaMailSender.send(simpleMailMessage); // Send the email
        return ResetToken;
    }

    @GetMapping("/resetPassword/{token}/{password}")
    public String findUserByResetToken(@PathVariable String token,@PathVariable String password) {
        User user = authServiceImpl.findUserByResetPasswordToken(token);
        if (user == null) {
            //System.out.println("No account found for the given email.");
            return "No account found for the given email.";
        }
        Date  ResetPasswordTokenCreation = user.getDateResetPasswordToken();
        if(!isExpired(ResetPasswordTokenCreation)){
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            user.setPassword(passwordEncoder.encode(password));
            user.setResetPasswordToken(null);
            user.setDateResetPasswordToken(null);
            String userName = user.getName();
            repo.save(user);
            return ResetToken;
        }
        else{
            return "Time out resubmit your email Please!";
        }
    }

    private boolean isExpired(Date resetPasswordTokenCreation) {
        // Get the current date and time
        Date currentDateTime = new Date();
        // Calculate the difference between ResetPasswordTokenCreation and the current date
        long durationInMillis = currentDateTime.getTime() - resetPasswordTokenCreation.getTime();
        long durationInMinutes = durationInMillis / (60 * 1000);
        return  (durationInMinutes > 5);
    }
}
