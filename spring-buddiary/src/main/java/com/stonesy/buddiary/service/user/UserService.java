package com.stonesy.buddiary.service.user;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.stonesy.buddiary.config.auth.JWTUtils;
import com.stonesy.buddiary.domain.category.Category;
import com.stonesy.buddiary.domain.category.CategoryRepository;
import com.stonesy.buddiary.domain.friend.Friend;
import com.stonesy.buddiary.domain.friend.FriendRepository;
import com.stonesy.buddiary.domain.todo.Todo;
import com.stonesy.buddiary.domain.todo.TodoRepository;
import com.stonesy.buddiary.domain.user.User;
import com.stonesy.buddiary.domain.user.UserRepository;
import com.stonesy.buddiary.web.dto.friend.FriendListResponseDto;
import com.stonesy.buddiary.web.dto.user.IdTokenRequestDto;
import com.stonesy.buddiary.web.dto.user.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final FriendRepository friendRepository;
    private final TodoRepository todoRepository;
    private final CategoryRepository categoryRepository;

    public List<FriendListResponseDto> getFriends(Long userId){
        User user = userRepository.findById(userId).orElseThrow(()->new IllegalArgumentException("해당 유저가 없습니다. userId="+userId));;
        List<Friend> friends = friendRepository.findAllByUserId(user.getId());
        return friends.stream().map(FriendListResponseDto::new).collect(Collectors.toList());
    }

    public UserResponseDto getUserByEmail(String email){
        User user =  userRepository.findByEmail(email).orElseThrow(()->new IllegalArgumentException("해당 유저가 없습니다. email="+email));;
        return new UserResponseDto(user);
    }

    public void delete(Long userId){
        User user = userRepository.findById(userId).orElseThrow(()->new IllegalArgumentException("해당 유저가 없습니다. userId="+userId));

        List<Todo> todos = user.getTodos();
        for(Todo todo : todos){
            todoRepository.delete(todo);
        }

        List<Category> categories = user.getCategories();
        for(Category category : categories){
            categoryRepository.delete(category);
        }

        List<Friend> friends = friendRepository.findAllByUserId(userId);
        for(Friend friend : friends){
            friendRepository.delete(friend);
        }
        friends = friendRepository.findAllByFriendId(userId);
        for(Friend friend : friends){
            friendRepository.delete(friend);
        }

        userRepository.delete(user);
    }
}
