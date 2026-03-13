package com.thara.brainybite_new.dto;

import com.thara.brainybite_new.entity.ArticleStatus;
import lombok.Data;

@Data
public class ArticleRequest {
    private String topic;
    private String description;
    private String content; //From Tiptap
    private String thumbnailUrl;
    private Integer categoryId;
    private ArticleStatus status;
}
