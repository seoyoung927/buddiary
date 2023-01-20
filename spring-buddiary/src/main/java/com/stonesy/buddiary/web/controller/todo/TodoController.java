package com.stonesy.buddiary.web.controller.todo;

import com.stonesy.buddiary.domain.todo.Todo;
import com.stonesy.buddiary.service.todo.TodoService;
import com.stonesy.buddiary.web.dto.todo.TodoDoneUpdateRequestDto;
import com.stonesy.buddiary.web.dto.todo.TodoListResponseDto;
import com.stonesy.buddiary.web.dto.todo.TodoSaveRequestDto;
import com.stonesy.buddiary.web.dto.todo.TodoUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
public class TodoController {
    private final TodoService todoService;

    @PostMapping("v1/api/todo/save/{categoryId}")
    public Long save(Principal principal, @PathVariable Long categoryId, @RequestBody TodoSaveRequestDto requestDto){
        Long userId = Long.parseLong(principal.getName());
        return todoService.save(userId, categoryId, requestDto);
    }

    @GetMapping("v1/api/todo/{date}")
    public List<TodoListResponseDto> findAllByDate(Principal principal, @PathVariable String date){
        if(principal!=null){
            Long userId = Long.parseLong(principal.getName());
            return todoService.findAllByDate(userId, date);
        }else{
            List<Todo> tmp = new ArrayList<Todo>();
            return tmp.stream().map(TodoListResponseDto::new).collect(Collectors.toList());
        }
    }

//    @GetMapping("v1/api/todo/{id}/{date}")
//    public List<TodoListResponseDto> findAllByDateAndId(@PathVariable Long id,@PathVariable String date){
//        return todoService.findAllByDate(id, date);
//    }

    @PutMapping("/v1/api/todo/update/{id}")
    public Long update(@PathVariable Long id, @RequestBody TodoUpdateRequestDto requestDto){
        return todoService.update(id, requestDto);
    }

    @PutMapping("/v1/api/todo/update/done/{id}")
    public Long updateDone(@PathVariable Long id, @RequestBody TodoDoneUpdateRequestDto requestDto){
        return todoService.updateDone(id, requestDto);
    }

    @DeleteMapping("/v1/api/todo/delete/{id}")
    public Long delete(@PathVariable Long id){
        todoService.delete(id);
        return id;
    }
}
