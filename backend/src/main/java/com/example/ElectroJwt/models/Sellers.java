package com.example.ElectroJwt.models;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Sellers")

public class Sellers {
    @Id
    private String id ;
    private String nomcommerciale ;
    private String localisation;
    private String siteUrl;
}
