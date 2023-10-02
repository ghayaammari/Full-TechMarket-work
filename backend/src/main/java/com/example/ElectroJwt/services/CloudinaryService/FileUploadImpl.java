package com.example.ElectroJwt.services.CloudinaryService;

import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class FileUploadImpl implements FileUpload{

    private final Cloudinary cloudinary;
    @Override
    public String uploadFile(MultipartFile multipartFile) throws Exception {
        return cloudinary.uploader()
                .upload(multipartFile.getBytes(), Map.of("public_id",UUID.randomUUID().toString()))
                .get("url")
                .toString();
    }
}
