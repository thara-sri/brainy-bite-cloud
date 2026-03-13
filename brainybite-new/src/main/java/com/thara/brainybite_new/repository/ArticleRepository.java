package com.thara.brainybite_new.repository;

import com.thara.brainybite_new.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    Optional<Article> findBySlug(String slug);
    boolean existsBySlug(String slug);
    Page<Article> findByAuthorId(String authorId, Pageable pageable);
    Page<Article> findByCategoryId(Integer categoryId, Pageable pageable);
}
