package com.stonesy.buddiary.web.controller.user;

import com.stonesy.buddiary.domain.friend.Friend;
import com.stonesy.buddiary.domain.user.User;
import com.stonesy.buddiary.service.user.UserService;
import com.stonesy.buddiary.web.dto.friend.FriendListResponseDto;
import com.stonesy.buddiary.web.dto.user.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

import static com.stonesy.buddiary.web.dto.user.UserDto.convertToDto;

@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserService userService;

    @GetMapping("v1/api/user/search/email/{email}")
    public UserResponseDto findUserByEmail(@PathVariable String email){
        return userService.getUserByEmail(email);
    }

    @GetMapping("v1/api/user/friend")
    public List<FriendListResponseDto> findAllFriend(Principal principal){
        Long userId = Long.parseLong(principal.getName());
        return userService.getFriends(userId);
    }

    @DeleteMapping("v1/api/user/delete")
    public void delete(Principal principal){
        Long userId = Long.parseLong(principal.getName());
        userService.delete(userId);
    }
}
