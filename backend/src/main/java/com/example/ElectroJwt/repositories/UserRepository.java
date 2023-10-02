package com.example.ElectroJwt.repositories;

import com.example.ElectroJwt.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
    User findFirstByEmail(String email);

    User findByResetPasswordToken(String resetToken);


}
