package com.example.ElectroJwt.dtos;

import com.example.ElectroJwt.models.ProduitSuiviPrice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddSuivrePrixResponse {
    private boolean ProductExist;
    private boolean CantAdd;
    private  boolean added;
    private ProduitSuiviPrice theadded;
}
