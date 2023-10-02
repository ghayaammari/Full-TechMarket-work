package com.example.ElectroJwt.services.CloudinaryService;

import org.springframework.web.multipart.MultipartFile;

public interface FileUpload {
    String uploadFile(MultipartFile multipartFile) throws Exception;
}
