package com.thara.brainybite_new.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileUploadService {

    private final S3Client s3Client;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Value("${aws.region}")
    private String region;

    // Only image file extensions are allowed to prevent from uploading suspicious files.
    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList("jpg", "jpeg", "png", "webp");

    public String uploadImage(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        // Retrieve the original filename and extension for verification.
        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1).toLowerCase();
        }

        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new RuntimeException("Invalid file type. Only JPG, PNG, and WEBP are allowed.");
        }

        // Create a new filename using its UUID to prevent duplicate names.
        String uniqueFilename = UUID.randomUUID().toString() + "." + extension;

        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(uniqueFilename)
                    .contentType(file.getContentType())
                    // .acl(ObjectCannedACL.PUBLIC_READ) // Bucket Policy is already set to Public.
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            return String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, region, uniqueFilename);

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image to S3", e);
        }
    }
}
