package com.stonesy.buddiary.web.dto.todo;

import com.stonesy.buddiary.domain.todo.Todo;
import lombok.Getter;

@Getter
public class TodoListResponseDto {
    private Long id;
    private String title;
    private int year;
    private int month;
    private int date;
    private Long userId;
    private Long categoryId;
    private int done;

    public TodoListResponseDto(Todo entity){
        this.id=entity.getId();
        this.title=entity.getTitle();
        this.year=entity.getDate().getYear();
        this.month=entity.getDate().getMonthValue();
        this.date=entity.getDate().getDayOfMonth();
        this.userId=entity.getUser().getId();
        this.categoryId=entity.getCategory().getId();
        this.done=entity.getDone();
    }
}
