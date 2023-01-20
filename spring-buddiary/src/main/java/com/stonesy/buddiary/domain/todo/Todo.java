package com.stonesy.buddiary.domain.todo;

import com.stonesy.buddiary.domain.category.Category;
import com.stonesy.buddiary.domain.user.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "todo")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 500, nullable = false)
    private String title;
    @Column(nullable = false)
    private LocalDate date;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;
    @Column(nullable = false)
    private int done;

    @Builder
    public Todo(String title, LocalDate date, User user, Category category, int done){
        this.title = title;
        this.date = date;
        this.user = user;
        this.category = category;
        this.done = done;
    }

    public void update(String title) {
        this.title=title;
    }

    public void updateDone(int done) {
        this.done=done;
    }
}
