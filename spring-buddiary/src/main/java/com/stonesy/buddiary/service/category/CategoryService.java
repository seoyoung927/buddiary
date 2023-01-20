package com.stonesy.buddiary.service.category;

import com.stonesy.buddiary.domain.category.Category;
import com.stonesy.buddiary.domain.category.CategoryRepository;
import com.stonesy.buddiary.domain.todo.Todo;
import com.stonesy.buddiary.domain.todo.TodoRepository;
import com.stonesy.buddiary.domain.user.User;
import com.stonesy.buddiary.domain.user.UserRepository;
import com.stonesy.buddiary.web.dto.category.CategoryListResponseDto;
import com.stonesy.buddiary.web.dto.category.CategorySaveRequestDto;
import com.stonesy.buddiary.web.dto.category.CategoryUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final TodoRepository todoRepository;

    @Transactional
    public Long save(Long userId, CategorySaveRequestDto requestDto){
        Optional<User> user = userRepository.findById(userId);
        requestDto.setUser(user.orElseThrow(IllegalStateException::new));
        return categoryRepository.save(requestDto.toEntity()).getId();
    }

    @Transactional(readOnly = true)
    public List<CategoryListResponseDto> getCategory(Long userId){
        return categoryRepository.findAllById(userId).stream()
                .map(CategoryListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public Long update(Long id, CategoryUpdateRequestDto requestDto) {
        Category category = categoryRepository.findById(id).orElseThrow(()->new IllegalArgumentException("해당 카테고리가 없습니다. id="+id));
        category.update(requestDto.getTitle());
        return id;
    }

    @Transactional
    public void delete(Long id){
        Category category = categoryRepository.findById(id).orElseThrow(()->new IllegalArgumentException("해당 카테고리가 없습니다. id="+id));
        categoryRepository.delete(category);

        for(Todo todo : category.getTodos()){
            todoRepository.delete(todo);
        }
    }
}
