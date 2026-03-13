package com.thara.brainybite_new.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ArticleResponse {
    private Long id;
    private String slug;
    private String topic;
    private String description;
    private String content;
    private String thumbnailUrl;
    private String authorId;
    private String status;
    private String categoryName; //Only Name
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
