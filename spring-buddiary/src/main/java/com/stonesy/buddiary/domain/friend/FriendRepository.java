package com.stonesy.buddiary.domain.friend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, Long> {
    @Query(value="SELECT * FROM friend f WHERE f.from_user=:id", nativeQuery=true)
    List<Friend> findAllByUserId(@Param("id") Long id);

    @Query(value="SELECT * FROM friend f WHERE f.user_id=:id", nativeQuery=true)
    List<Friend> findAllByFriendId(@Param("id") Long id);
}
