package com.example.ElectroJwt.services.jwt;

import com.example.ElectroJwt.models.User;
import com.example.ElectroJwt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {


    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findFirstByEmail(email);
        if(user == null){
            throw new UsernameNotFoundException("UserNotFound",null);
        }
        //el code el asli
        return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),new ArrayList<>());
        //el code elli ena baddelto
        //return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(), user.getId(),new ArrayList<>());

    }
}
