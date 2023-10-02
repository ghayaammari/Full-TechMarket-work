package com.example.ElectroJwt.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductsVAR {
    private String nom;
    private String category;
    private float price;
    private String description ;
    private String nomfournisseur ;
    private String image ;
}
