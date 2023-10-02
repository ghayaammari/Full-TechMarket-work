package com.example.ElectroJwt.dtos;

import com.example.ElectroJwt.models.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SuivrePrixGetProduct {
    private float prixAttendu;
    private Product product;
}
