package com.thara.brainybite_new.repository;

import com.thara.brainybite_new.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    Optional<Article> findBySlug(String slug);
    boolean existsBySlug(String slug);
    Page<Article> findByAuthorId(String authorId, Pageable pageable);
    //Page<Article> findByCategoryId(Integer categoryId, Pageable pageable);

    @Query("SELECT a FROM Article a WHERE " +
            "(:categoryId IS NULL OR a.category.id = :categoryId) AND " +
            "(:keyword = '' OR LOWER(a.topic) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(a.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Article> searchArticles(@Param("categoryId") Integer categoryId,
                                 @Param("keyword") String keyword,
                                 Pageable pageable);
}
