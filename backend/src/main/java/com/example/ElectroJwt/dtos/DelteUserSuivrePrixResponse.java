package com.example.ElectroJwt.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DelteUserSuivrePrixResponse {
    private boolean delted;
    private  boolean exist;
    private boolean cantdelte;
}
