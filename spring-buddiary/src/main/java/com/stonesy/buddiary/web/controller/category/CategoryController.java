package com.stonesy.buddiary.web.controller.category;

import com.stonesy.buddiary.service.category.CategoryService;
import com.stonesy.buddiary.web.dto.category.CategoryListResponseDto;
import com.stonesy.buddiary.web.dto.category.CategorySaveRequestDto;
import com.stonesy.buddiary.web.dto.category.CategoryUpdateRequestDto;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping("v1/api/category/save")
    public Long save(Principal principal, @RequestBody CategorySaveRequestDto requestDto){
        Long userId = Long.parseLong(principal.getName());
        return categoryService.save(userId, requestDto);
    }

    @GetMapping("v1/api/category")
    public List<CategoryListResponseDto> findAllUserId(Principal principal){
        Long userId = Long.parseLong(principal.getName());
        return categoryService.getCategory(userId);
    }

    @PutMapping("v1/api/category/update/{id}")
    public Long update(@PathVariable Long id, @RequestBody CategoryUpdateRequestDto requestDto){
        return categoryService.update(id, requestDto);
    }

    @DeleteMapping("v1/api/category/delete/{id}")
    public void delete(@PathVariable Long id){
        categoryService.delete(id);
    }
}
