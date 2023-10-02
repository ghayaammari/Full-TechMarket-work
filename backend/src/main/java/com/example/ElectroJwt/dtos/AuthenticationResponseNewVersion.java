package com.example.ElectroJwt.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthenticationResponseNewVersion {
    private  String jwt;
    private Integer role ;
    private String name ;
    private String email;
}
