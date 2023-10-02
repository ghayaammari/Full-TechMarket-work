package com.example.ElectroJwt.models;


import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Product")
public class Product {
    //@Indexed(unique = true)
    @Id
    private String id;
    private String name;
    private float price;
    private String category;
    private String description;
    private String imageUrl; // Store the image URL instead of the file content
    private String urls; // Use a single string for URLs
    private String nomFournisseur;
    private  String marque;

    private boolean disponibilite ;
    //products owner
//GHAYA MODIFACTIONS
//@DBRef
    private String productOwnerId;
    private List<Integer> rates;


//the name of product owner that the admin will specify it when he adds a product
//only the admin adds this data





}
