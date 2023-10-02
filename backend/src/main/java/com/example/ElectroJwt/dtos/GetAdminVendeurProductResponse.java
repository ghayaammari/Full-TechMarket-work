package com.example.ElectroJwt.dtos;

import com.example.ElectroJwt.models.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAdminVendeurProductResponse {
    private boolean haveproducts;
    private List<Product> products;


}
