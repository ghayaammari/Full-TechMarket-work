package com.example.ElectroJwt.services.ProductServices;

import com.example.ElectroJwt.models.Product;
import com.example.ElectroJwt.models.Rates;
import com.example.ElectroJwt.repositories.ProductRepository;
import com.example.ElectroJwt.services.CloudinaryService.FileUploadImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;


@Service
public class ProductServicesImpl implements ProductServices{

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private FileUploadImpl fileUploadImpl;

    @Autowired
    private MongoTemplate mongoTemplate;
    @Override
    public boolean deleteProductById(String productId) {
        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isPresent()) {
            productRepository.deleteById(productId);
            return true;
        }
        return false;
    }

    @Override
    public Product updateProductById(String id, String name, float price, String category, String description, MultipartFile image, String urls) {
        try {
            String imageUrl = fileUploadImpl.uploadFile(image);

            Optional<Product> optionalProduct = productRepository.findById(id);
            if (optionalProduct.isEmpty()) {
                return null; // Return null if the product is not found.
            }
            Product product = optionalProduct.get();
            product.setName(name);
            product.setPrice(price);
            product.setCategory(category);
            product.setDescription(description);
            product.setImageUrl(imageUrl);
            product.setUrls(urls);

            return productRepository.save(product);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
    public  List<Product> ProductWithsameName(String name){

        // Créez une expression régulière pour rechercher le nom en ignorant les espaces
        String regexPattern = ".*" + name.replaceAll("\\s", ".*") + ".*";

        Query query = new Query();
        query.addCriteria(Criteria.where("name").regex(regexPattern, "i"));

        return mongoTemplate.find(query, Product.class);
    }
    public List<Product> ProduitSimilaire(String categorie , String marque ){


        List<Product> products = mongoTemplate.find(
                Query.query(
                        new Criteria()
                                .andOperator(
                                        Criteria.where("marque").is(marque),
                                        Criteria.where("category").is(categorie) // Vérifie que le produit est en stock
                                )
                ),
                Product.class
        );
        return products;

    }
    public List<Product> searchProducts(String name, String categorie, String marque) {
        // Créez une expression régulière pour rechercher le nom en ignorant les espaces
        String regexPattern = ".*" + name.replaceAll("\\s", ".*") + ".*";

        Query query = new Query();

        Criteria criteria = new Criteria();

        if (name != null && !name.isEmpty()) {
            criteria.and("name").regex(regexPattern, "i");
        }

        if (categorie != null && !categorie.isEmpty()) {
            criteria.and("category").is(categorie);
        }

        if (marque != null && !marque.isEmpty()) {
            criteria.and("marque").is(marque);
        }

        query.addCriteria(criteria);

        return mongoTemplate.find(query, Product.class);
    }
}
