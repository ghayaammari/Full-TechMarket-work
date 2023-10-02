package com.example.ElectroJwt.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Users")

public class User {
    @Id
    private String id;


    private String name;


    @Indexed(unique = true)
    private String email;


    @Indexed(unique = true)
    private String phone;


    private String password;


    private Integer role;


    private String resetPasswordToken;


    private Date dateResetPasswordToken;
    //GHAYA MODIFICATIONS
    @DBRef
    private Sellers SellerData;


    //@DBRef
    //private List<Product> UserProducts; //el products elli zedhom
    //@DBRef
    private List<String> MaSelction;
    //private ArrayList<String> MaSelction; // liste de l'id des produits ajouter a ma selection
    //@DBRef
    //private List<String> ListeProduitSuiviPrice;
    //private  List<String> ProduitSuiviPrice;
}