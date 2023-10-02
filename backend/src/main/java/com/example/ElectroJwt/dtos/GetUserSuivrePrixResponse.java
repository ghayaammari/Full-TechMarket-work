package com.example.ElectroJwt.dtos;

import com.example.ElectroJwt.models.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetUserSuivrePrixResponse {
    private  boolean haveproducts;
    private boolean canthahveproducts;
    private List<SuivrePrixGetProduct> ListProduct;
}
