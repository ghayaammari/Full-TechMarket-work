package com.example.ElectroJwt.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GetMaselectionIdsResponse {
    private boolean existP ;
    private List<String> idslist;
}
