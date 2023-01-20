package com.stonesy.buddiary.web.dto.category;

import com.stonesy.buddiary.domain.category.Category;
import com.stonesy.buddiary.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class CategorySaveRequestDto {
    private String title;
    private User user;

    @Builder
    public CategorySaveRequestDto(String title){
        this.title=title;
    }

    public Category toEntity(){
        return Category.builder()
                .title(title)
                .user(user)
                .build();
    }
}
