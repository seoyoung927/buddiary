package com.stonesy.buddiary.web.dto.todo;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class TodoDoneUpdateRequestDto {
    private int done;

    @Builder
    public TodoDoneUpdateRequestDto(int done){
        this.done=done;
    }
}
