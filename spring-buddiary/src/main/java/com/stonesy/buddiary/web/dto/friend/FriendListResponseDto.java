package com.stonesy.buddiary.web.dto.friend;

import com.stonesy.buddiary.domain.friend.Friend;
import com.stonesy.buddiary.domain.friend.FriendStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class FriendListResponseDto {
    private Long id;
    private Long friendId;
    private String firstName;
    private String lastName;
    private String pictureUrl;
    private String status;

    public FriendListResponseDto(Friend entity){
        this.id=entity.getId();
        this.friendId = entity.getUser().getId();
        this.firstName = entity.getUser().getFirstName();
        this.lastName = entity.getUser().getLastName();
        this.pictureUrl = entity.getUser().getPictureUrl();
        this.status = entity.getStatus().toString();
    }
}
