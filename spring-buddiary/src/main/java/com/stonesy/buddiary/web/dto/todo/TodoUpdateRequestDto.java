package com.stonesy.buddiary.web.dto.todo;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class TodoUpdateRequestDto {
    private String title;

    @Builder
    public TodoUpdateRequestDto(String title){
        this.title=title;
    }
}
