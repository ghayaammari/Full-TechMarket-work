package com.example.ElectroJwt.dtos;

import com.example.ElectroJwt.models.Product;
import com.example.ElectroJwt.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetMaselectionListResponse {
    private  boolean ListeVide ;
    //private boolean somethingWrong;
    private boolean cantHaveProducts;
    private List<Product> ListProduct;
}
