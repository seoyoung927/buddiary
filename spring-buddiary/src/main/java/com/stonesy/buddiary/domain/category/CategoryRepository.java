package com.stonesy.buddiary.domain.category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query(value="SELECT * FROM category c WHERE c.user_id=:id", nativeQuery=true)
    List<Category> findAllById(@Param("id") Long id);

}
