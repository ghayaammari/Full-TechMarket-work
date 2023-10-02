package com.example.ElectroJwt.models;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "ProduitSuiviPrice")
public class ProduitSuiviPrice {
    @Id
    private String id;
    private String productid;
    private String UserId;
    private float priceAttendu;

}
