package com.example.ElectroJwt.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllProductsResponse {
    private String id;
    private String name;
    private float price;
    private String category;
    private String description;
    private String imageUrl; // Store the image URL instead of the file content
    private String urls; // Use a single string for URLs
    private String nomFournisseur;
    private boolean disponibilite ;
    private List<Integer> rates;

}
