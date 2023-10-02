package com.example.ElectroJwt.services.ProductServices;

import com.example.ElectroJwt.models.Product;
import org.springframework.web.multipart.MultipartFile;

public interface ProductServices {
    public boolean deleteProductById(String productId);
    Product updateProductById(String id, String name, float price, String category, String description, MultipartFile image, String urls);
}
