package com.stonesy.buddiary.service.friend;

import com.stonesy.buddiary.domain.friend.Friend;
import com.stonesy.buddiary.domain.friend.FriendRepository;
import com.stonesy.buddiary.domain.todo.TodoRepository;
import com.stonesy.buddiary.domain.user.User;
import com.stonesy.buddiary.domain.user.UserRepository;
import com.stonesy.buddiary.web.dto.category.CategoryListResponseDto;
import com.stonesy.buddiary.web.dto.friend.FriendSaveRequestDto;

import com.stonesy.buddiary.web.dto.todo.TodoListResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class FriendService {
    private final FriendRepository friendRepository;
    private final UserRepository userRepository;
    private final TodoRepository todoRepository;

    @Transactional
    public Long save(Long userId, Long friendId, FriendSaveRequestDto requestDto){
        User user = userRepository.findById(userId).orElseThrow(()->new IllegalArgumentException("해당 회원 없습니다. id="+userId));
        User friendUser = userRepository.findById(friendId).orElseThrow(()->new IllegalArgumentException("해당 회원 없습니다. id="+friendId));

        requestDto.setFrom_user(user.getId());
        requestDto.setUser(friendUser);
        friendRepository.save(requestDto.toEntity()).getId();

        requestDto.setFrom_user(friendUser.getId());
        requestDto.setUser(user);
        return friendRepository.save(requestDto.toEntity()).getId();
    }

    @Transactional
    public void delete(Long userId, Long id){
        Friend friend = friendRepository.findById(id).orElseThrow(()->new IllegalArgumentException("해당 친구 없습니다. id="+id));

        friendRepository.delete(friend);
    }

    @Transactional
    public Long updateStatus(Long userId, Long id) {
        Friend friend = friendRepository.findById(id).orElseThrow(()->new IllegalArgumentException("해당 친구가 없습니다. id="+id));
        friend.updateStatus();
        User user = friend.getUser();

        List<Friend> friends = friendRepository.findAllByUserId(user.getId());
        for(Friend f : friends){
            if(f.getFrom_user()==user.getId()){
                f.updateStatus();
            }
        }

        return userId;
    }

    @Transactional
    public List<TodoListResponseDto> getTodo(Long id, String date){
        Friend friend = friendRepository.findById(id).orElseThrow(()->new IllegalArgumentException("해당 친구 없습니다. id="+id));
        User user = friend.getUser();
        return todoRepository.findAllByDate(user.getId(), date).stream()
                .map(TodoListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<CategoryListResponseDto> getCategory(Long id){
        Friend friend = friendRepository.findById(id).orElseThrow(()->new IllegalArgumentException("해당 친구 없습니다. id="+id));
        return friend.getUser().getCategories().stream()
                .map(CategoryListResponseDto::new)
                .collect(Collectors.toList());
    }


}
