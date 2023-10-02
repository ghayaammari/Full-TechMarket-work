package com.example.ElectroJwt.repositories;

import com.example.ElectroJwt.models.Product;
import com.example.ElectroJwt.models.Sellers;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepository  extends MongoRepository<Sellers,String> {
}
