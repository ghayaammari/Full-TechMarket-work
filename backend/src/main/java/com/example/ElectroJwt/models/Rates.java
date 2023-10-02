package com.example.ElectroJwt.models;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Rates")
public class Rates {
    @Id
    private String id ;
    private Integer rate;
    private String idProduct;
    private String idUser;
    private String comment ;
    private String title ;

}
