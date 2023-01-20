package com.stonesy.buddiary.web.dto.user;

import com.stonesy.buddiary.domain.user.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserResponseDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String pictureUrl;

    public UserResponseDto(User entity){
        this.id=entity.getId();
        this.firstName=entity.getFirstName();
        this.lastName=entity.getLastName();
        this.email=entity.getEmail();
        this.pictureUrl=entity.getPictureUrl();
    }
}
