package com.example.ElectroJwt.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddProductRequest {
    private String token;
    private String name;
    private float price;
    private String category;
    private String description;
    private MultipartFile image; // Store the image URL instead of the file content
    //private String nomfournisseur ;
    private String url; // Use a single string for URLs


}
