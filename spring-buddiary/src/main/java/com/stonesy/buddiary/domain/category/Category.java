package com.stonesy.buddiary.domain.category;

import com.stonesy.buddiary.domain.todo.Todo;
import com.stonesy.buddiary.domain.user.User;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(length = 50, nullable = false)
    private String title;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    @OneToMany(mappedBy = "category")
    private List<Todo> todos = new ArrayList<Todo>();

    @Builder
    public Category(String title, User user){
        this.title = title;
        this.user = user;
    }

    public void update(String title) {
        this.title=title;
    }
}
