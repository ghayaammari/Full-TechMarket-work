package com.example.ElectroJwt.repositories;

import com.example.ElectroJwt.models.Rates;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatesRepository extends MongoRepository<Rates, String> {
}
