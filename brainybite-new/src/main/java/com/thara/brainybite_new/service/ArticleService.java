package com.thara.brainybite_new.service;

import com.thara.brainybite_new.dto.ArticleRequest;
import com.thara.brainybite_new.dto.ArticleResponse;
import com.thara.brainybite_new.entity.Article;
import com.thara.brainybite_new.entity.ArticleStatus;
import com.thara.brainybite_new.entity.Category;
import com.thara.brainybite_new.exception.ResourceNotFoundException;
import com.thara.brainybite_new.repository.ArticleRepository;
import com.thara.brainybite_new.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;

    public Page<ArticleResponse> getAllArticles(Integer categoryId, String keyword ,int page, int size) {
        // Create page breaks and instruct the articles to be sorted from newest to oldest. (fetch from createdAt with Descending)
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        String searchKeyword = (keyword == null) ? "" : keyword;

        Page<Article> articlePage = articleRepository.searchArticles(categoryId, searchKeyword, pageable);

        return articlePage.map(this::mapToResponse);
    }

    public Page<ArticleResponse> getMyArticles(String authorId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        Page<Article> articlePage = articleRepository.findByAuthorId(authorId, pageable);

        return articlePage.map(this::mapToResponse);
    }

    public ArticleResponse createArticle(ArticleRequest request, String authorId) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + request.getCategoryId()));

        //Create Slug from topic, if existed add timestamp
        String generatedSlug = request.getTopic().toLowerCase().replaceAll("[^a-z0-9ก-๙]+", "-");
        if (articleRepository.existsBySlug(generatedSlug)) {
            generatedSlug += "-" + System.currentTimeMillis();
        }

        Article article = Article.builder()
                .topic(request.getTopic())
                .slug(generatedSlug)
                .description(request.getDescription())
                .content(request.getContent())
                .thumbnailUrl(request.getThumbnailUrl())
                .category(category)
                .authorId(authorId) //Use authorId from Token
                .status(request.getStatus() != null ? request.getStatus() : ArticleStatus.DRAFT)
                .build();

        Article savedArticle = articleRepository.save(article);

        return mapToResponse(savedArticle);
    }

    public ArticleResponse getArticleBySlug(String slug) {
        Article article = articleRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found with slug: " + slug));

        return mapToResponse(article);
    }

    public ArticleResponse updateArticle(Long id, ArticleRequest request) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found with ID: " + id));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with ID: " + request.getCategoryId()));

        article.setTopic(request.getTopic());
        article.setDescription(request.getDescription());
        article.setContent(request.getContent());
        article.setThumbnailUrl(request.getThumbnailUrl());
        article.setCategory(category);

        if (request.getStatus() != null) {
            article.setStatus(request.getStatus());
        }

        Article updatedArticle = articleRepository.save(article);
        return mapToResponse(updatedArticle);
    }

    //Soft Deleting
    public void deleteArticle(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found with ID: " + id));

        article.setStatus(ArticleStatus.ARCHIVED);
        articleRepository.save(article);
    }

    private ArticleResponse mapToResponse(Article article) {
        return ArticleResponse.builder()
                .id(article.getId())
                .slug(article.getSlug())
                .topic(article.getTopic())
                .description(article.getDescription())
                .content(article.getContent())
                .thumbnailUrl(article.getThumbnailUrl())
                .authorId(article.getAuthorId())
                .status(article.getStatus().name()) // Enum to String
                .categoryName(article.getCategory().getName())
                .createdAt(article.getCreatedAt())
                .updatedAt(article.getUpdatedAt())
                .build();
    }
}
