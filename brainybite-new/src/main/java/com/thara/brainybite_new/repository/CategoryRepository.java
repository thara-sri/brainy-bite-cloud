package com.thara.brainybite_new.repository;

import com.thara.brainybite_new.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    Optional<Category> findByName(String name);
    boolean existsByName(String name);

}
