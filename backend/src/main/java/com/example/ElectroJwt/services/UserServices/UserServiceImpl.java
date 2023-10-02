package com.example.ElectroJwt.services.UserServices;

import com.example.ElectroJwt.models.User;
import com.example.ElectroJwt.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserServiceImpl {

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private UserRepository userRepository;
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUserByEmail(String email) {
        Optional<User> userOptional = Optional.ofNullable(userRepository.findFirstByEmail(email));

        if (userOptional.isPresent()) {
            userRepository.delete(userOptional.get());
        } else {
            throw new EntityNotFoundException("User with email " + email + " not found.");
        }
    }


    public boolean updateUserByEmail(String email, User updatedUser) {
        User existingUser = userRepository.findFirstByEmail(email);

        if (existingUser == null) {
            return false;
        }

        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPhone(updatedUser.getPhone());
        existingUser.setRole(updatedUser.getRole());

        userRepository.save(existingUser);

        return true;
    }


    public User updateUserEmail(String email, String newEmail) {
        User user = userRepository.findFirstByEmail(email);
        if (user != null) {
            user.setEmail(newEmail);
            return userRepository.save(user);
        }
        return null; // Or throw an exception if needed
    }

    public boolean updateUserInformation(String email, String newUsername, String newPhoneNumber) {
        Optional<User> optionalUser = Optional.ofNullable(userRepository.findFirstByEmail(email));

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setName(newUsername);
            user.setPhone(newPhoneNumber);
            userRepository.save(user);
            return true;
        }

        return false;
    }


    @Transactional
    public boolean updatePassword(String email, String newPassword) {
        User user = userRepository.findFirstByEmail(email);
        if (user != null) {
            String hashedPassword = passwordEncoder.encode(newPassword);
            user.setPassword(hashedPassword);
            userRepository.save(user);
            return true;
        }
        return false;
    }


    public User findUserById(String id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.orElse(null); // Return null if Optional is empty
    }


    //ghaya updates



    public Optional<User> addElement(String id, String element) {
        Optional<User> optionalEntity = userRepository.findById(id);
        if (optionalEntity.isPresent()) {
            User entity = optionalEntity.get();
            entity.getMaSelction().add(element);
            return Optional.of(userRepository.save(entity));
        }
        return Optional.empty();
    }

}
