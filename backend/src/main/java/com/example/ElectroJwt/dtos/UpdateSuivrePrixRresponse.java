package com.example.ElectroJwt.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateSuivrePrixRresponse {
    private boolean cantupdate;
    private boolean updated ;
    private boolean exist;
}