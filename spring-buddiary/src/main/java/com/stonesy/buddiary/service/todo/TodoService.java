package com.stonesy.buddiary.service.todo;

import com.stonesy.buddiary.domain.category.Category;
import com.stonesy.buddiary.domain.category.CategoryRepository;
import com.stonesy.buddiary.domain.todo.Todo;
import com.stonesy.buddiary.domain.todo.TodoRepository;
import com.stonesy.buddiary.domain.user.User;
import com.stonesy.buddiary.domain.user.UserRepository;
import com.stonesy.buddiary.web.dto.todo.TodoDoneUpdateRequestDto;
import com.stonesy.buddiary.web.dto.todo.TodoListResponseDto;
import com.stonesy.buddiary.web.dto.todo.TodoSaveRequestDto;

import com.stonesy.buddiary.web.dto.todo.TodoUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class TodoService {
    private final TodoRepository toDoRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    @Transactional
    public Long save(Long userId, Long categoryId, TodoSaveRequestDto requestDto){
        Optional<User> user = userRepository.findById(userId);
        requestDto.setUser(user.orElseThrow(IllegalStateException::new));

        Optional<Category> category = categoryRepository.findById(categoryId);
        requestDto.setCategory(category.orElseThrow(IllegalStateException::new));

        return toDoRepository.save(requestDto.toEntity()).getId();
    }

    @Transactional(readOnly = true)
    public List<TodoListResponseDto> findAllByDate(Long id, String date){
        return toDoRepository.findAllByDate(id,date).stream()
                .map(TodoListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public Long update(Long id, TodoUpdateRequestDto requestDto) {
        Todo todo = toDoRepository.findById(id).orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다. id="+id));
        todo.update(requestDto.getTitle());

        return id;
    }

    @Transactional
    public Long updateDone(Long id, TodoDoneUpdateRequestDto requestDto) {
        Todo todo = toDoRepository.findById(id).orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다. id="+id));
        todo.updateDone(requestDto.getDone());

        return id;
    }

    @Transactional
    public void delete(Long id){
        Todo todo = toDoRepository.findById(id).orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다. id="+id));
        toDoRepository.delete(todo);
    }
}
