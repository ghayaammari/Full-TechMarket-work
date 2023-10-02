package com.example.ElectroJwt.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductAddRateResponse {
    private boolean cantRate;
    private boolean rateGivenbefore;
    private boolean rateadded;
}
