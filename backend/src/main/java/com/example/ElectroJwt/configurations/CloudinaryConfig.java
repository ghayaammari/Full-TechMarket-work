package com.example.ElectroJwt.configurations;

import com.cloudinary.Cloudinary;
import lombok.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {
    private final String CLOUD_NAME = "db6dya3xv";
    private final String API_KEY = "812676281586347";
    private final String API_SECRET = "7rtq-zODku-FFxYDsSXVjoZ_PM4";

    @Bean
    public Cloudinary cloudinary() {
        Map<String,String> config = new HashMap<>();
        config.put("cloud_name",CLOUD_NAME);
        config.put("api_key",API_KEY);
        config.put("api_secret",API_SECRET);
        return new Cloudinary(config);
    }
}
