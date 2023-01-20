package com.stonesy.buddiary.web.dto.category;

import com.stonesy.buddiary.domain.category.Category;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class CategoryListResponseDto {
    private Long id;
    private String title;
    private Long userId;

    public CategoryListResponseDto(Category entity){
        this.id=entity.getId();
        this.title=entity.getTitle();
        this.userId=entity.getUser().getId();
    }
}
