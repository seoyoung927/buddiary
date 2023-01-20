package com.stonesy.buddiary.domain.todo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    @Query(value="SELECT * FROM todo t WHERE t.user_id=:id AND t.date=:date", nativeQuery=true)
    List<Todo> findAllByDate(@Param("id") Long id, @Param("date") String date);
}
