package com.stonesy.buddiary.domain.user;

import com.stonesy.buddiary.domain.category.Category;
import com.stonesy.buddiary.domain.friend.Friend;
import com.stonesy.buddiary.domain.todo.Todo;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name="first_name", length = 10, nullable = false)
    private String firstName;
    @Column(name="last_name", length = 10, nullable = false)
    private String lastName;
    private String email;
    @Column(name="picture_url", nullable = false)
    private String pictureUrl;
    private String roles;
    @OneToMany(mappedBy = "user")
    private List<Todo> todos = new ArrayList<Todo>();
    @OneToMany(mappedBy = "user")
    private List<Category> categories = new ArrayList<Category>();
    @OneToMany(mappedBy = "user")
    private List<Friend> friends = new ArrayList<Friend>();

    public User(String firstName, String lastName, String email, String pictureUrl) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.pictureUrl = pictureUrl;
    }
}

