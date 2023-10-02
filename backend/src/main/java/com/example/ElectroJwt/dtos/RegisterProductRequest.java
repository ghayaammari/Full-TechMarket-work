package com.example.ElectroJwt.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.Indexed;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterProductRequest {
    private String id;
    private String name;
    private float price;
    private String category;
    private String description;
    private String image;
    private String urls; // Use a single string for URLs
}
