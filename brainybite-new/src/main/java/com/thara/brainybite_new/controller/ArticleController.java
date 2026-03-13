package com.thara.brainybite_new.controller;

import com.thara.brainybite_new.dto.ArticleRequest;
import com.thara.brainybite_new.dto.ArticleResponse;
import com.thara.brainybite_new.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping
    public ResponseEntity<Page<ArticleResponse>> getAllArticles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(articleService.getAllArticles(page, size));
    }

    @GetMapping("/me")
    public ResponseEntity<Page<ArticleResponse>> getMyArticles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @AuthenticationPrincipal Jwt jwt) {

        String authorId = jwt.getSubject(); // Extract the User ID from the Token

        return ResponseEntity.ok(articleService.getMyArticles(authorId, page, size));
    }

    @PostMapping
    public ResponseEntity<ArticleResponse> createArticle(@RequestBody ArticleRequest request, @AuthenticationPrincipal Jwt jwt) {
        String authorId = jwt.getSubject();
        ArticleResponse createdArticle = articleService.createArticle(request, authorId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdArticle);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ArticleResponse> getArticleBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(articleService.getArticleBySlug(slug));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArticleResponse> updateArticle(@PathVariable Long id, @RequestBody ArticleRequest request) {
        return ResponseEntity.ok(articleService.updateArticle(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return ResponseEntity.noContent().build(); // return 204 No Content
    }
}
