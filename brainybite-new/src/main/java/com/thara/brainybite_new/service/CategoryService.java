package com.thara.brainybite_new.service;

import com.thara.brainybite_new.repository.CategoryRepository;
import com.thara.brainybite_new.dto.CategoryRequest;
import com.thara.brainybite_new.entity.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category createCategory(CategoryRequest request) {
        // เช็คว่ามีชื่อนี้ในระบบหรือยัง
        if (categoryRepository.existsByName(request.getName())) {
            throw new RuntimeException("Category name already exists!");
        }

        Category category = Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();

        return categoryRepository.save(category);
    }
}
