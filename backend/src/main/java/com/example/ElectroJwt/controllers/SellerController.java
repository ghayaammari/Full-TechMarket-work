package com.example.ElectroJwt.controllers;

import com.example.ElectroJwt.models.Sellers;
import com.example.ElectroJwt.repositories.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SellerController {
    @Autowired
    SellerRepository SellerRepo ;
    @PostMapping ("/addvendeur")
    public String addSeller(@RequestBody Sellers seller){
        SellerRepo.save(seller);
        return "seller added with success";

    }
    @GetMapping("/allsellers")
    public List<Sellers> findallsellers(){
        return SellerRepo.findAll();
    }
}
