package com.stonesy.buddiary.web.dto.category;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
public class CategoryUpdateRequestDto {
    private String title;

    @Builder
    public CategoryUpdateRequestDto(String title){
        this.title=title;
    }
}
