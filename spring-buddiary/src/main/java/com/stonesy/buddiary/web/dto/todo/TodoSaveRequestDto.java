package com.stonesy.buddiary.web.dto.todo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.stonesy.buddiary.domain.category.Category;
import com.stonesy.buddiary.domain.todo.Todo;
import com.stonesy.buddiary.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class TodoSaveRequestDto {
    private String title;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate date;
    private User user;
    private Category category;
    private int done;

    @Builder
    public TodoSaveRequestDto(String title, LocalDate date, int done){
        this.title=title;
        this.date=date;
        this.done=done;
    }

    public Todo toEntity(){
        return Todo.builder()
                .title(title)
                .date(date)
                .user(user)
                .category(category)
                .done(done)
                .build();
    }
}
