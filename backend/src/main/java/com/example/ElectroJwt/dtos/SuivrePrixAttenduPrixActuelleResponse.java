package com.example.ElectroJwt.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SuivrePrixAttenduPrixActuelleResponse {
    private  float prixactuelle;
    private float prixattendue ;
}
