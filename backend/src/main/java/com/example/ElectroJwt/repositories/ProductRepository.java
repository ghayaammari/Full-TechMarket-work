package com.example.ElectroJwt.repositories;


import com.example.ElectroJwt.models.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product,String> {
}
