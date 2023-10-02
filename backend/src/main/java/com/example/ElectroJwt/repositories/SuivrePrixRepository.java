package com.example.ElectroJwt.repositories;

import com.example.ElectroJwt.models.ProduitSuiviPrice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuivrePrixRepository extends MongoRepository<ProduitSuiviPrice , String> {
}
