package com.example.ElectroJwt.dtos;

import com.example.ElectroJwt.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddMaSelectionResponse {
    private  boolean ProductAdded ;
    private boolean youcantadd;
    private boolean productExiste;
    private User user ;
}
