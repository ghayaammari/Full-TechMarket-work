package com.example.ElectroJwt.services.UserServices;

import com.example.ElectroJwt.models.User;

import java.util.List;

public interface UserServices {
    public List<User> getAllUsers();

    public void deleteUserByEmail(String email);

    public boolean updateUserByEmail(String email, User updatedUser);

    public User updateUserEmail(String email, String newEmail);

    public boolean updateUserInformation(String email, String newUsername, String newPhoneNumber);

    public boolean updatePassword(String email, String newPassword);

    public  User findUserById(String id);
}
