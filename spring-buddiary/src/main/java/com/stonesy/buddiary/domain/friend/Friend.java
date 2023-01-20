package com.stonesy.buddiary.domain.friend;

import com.stonesy.buddiary.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "friend")
public class Friend {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long from_user;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    @Enumerated(EnumType.STRING)
    private FriendStatus status;

    @Builder
    public Friend(Long from_user, User user, FriendStatus status){
        this.from_user=from_user;
        this.user=user;
        this.status=status;
    }

    public void updateStatus() {
        this.status = FriendStatus.FRIEND;
    }
}
