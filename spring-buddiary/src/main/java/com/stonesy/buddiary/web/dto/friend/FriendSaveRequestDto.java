package com.stonesy.buddiary.web.dto.friend;

import com.stonesy.buddiary.domain.friend.Friend;
import com.stonesy.buddiary.domain.friend.FriendStatus;
import com.stonesy.buddiary.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FriendSaveRequestDto {
    private Long from_user;
    private User user;
    private FriendStatus status;

    @Builder
    public FriendSaveRequestDto(){
    }

    public Friend toEntity(){
        return Friend.builder()
                .from_user(from_user)
                .user(user)
                .status(FriendStatus.WAITING)
                .build();
    }
}
