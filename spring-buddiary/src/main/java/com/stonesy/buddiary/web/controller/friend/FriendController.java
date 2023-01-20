package com.stonesy.buddiary.web.controller.friend;

import com.stonesy.buddiary.service.friend.FriendService;
import com.stonesy.buddiary.service.user.UserService;
import com.stonesy.buddiary.web.dto.category.CategoryListResponseDto;
import com.stonesy.buddiary.web.dto.friend.FriendSaveRequestDto;
import com.stonesy.buddiary.web.dto.todo.TodoListResponseDto;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class FriendController {
    private final FriendService friendService;

    @PostMapping("v1/api/friend/save/{friendId}")
    public Long save(Principal principal, @PathVariable Long friendId, @RequestBody FriendSaveRequestDto requestDto){
        Long userId = Long.parseLong(principal.getName());
        return friendService.save(userId, friendId, requestDto);
    }

    @PutMapping("/v1/api/friend/update/status/{id}")
    public Long updateStatus(Principal principal,@PathVariable Long id){
        Long userId = Long.parseLong(principal.getName());
        return friendService.updateStatus(userId, id);
    }

    @DeleteMapping("/v1/api/friend/delete/{id}")
    public Long delete(Principal principal, @PathVariable Long id){
        Long userId = Long.parseLong(principal.getName());
        friendService.delete(userId, id);
        return id;
    }

    @GetMapping("/v1/api/friend/todo/{id}/{date}")
    public List<TodoListResponseDto> getTodo(Principal principal, @PathVariable Long id, @PathVariable String date){
        Long userId = Long.parseLong(principal.getName());
        return friendService.getTodo(id, date);
    }

    @GetMapping("/v1/api/friend/category/{id}")
    public List<CategoryListResponseDto> getCategory(Principal principal, @PathVariable Long id){
        Long userId = Long.parseLong(principal.getName());
        return friendService.getCategory(id);
    }

}
