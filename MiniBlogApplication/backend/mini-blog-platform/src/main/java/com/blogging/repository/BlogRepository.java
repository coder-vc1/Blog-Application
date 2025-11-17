package com.blogging.repository;

import com.blogging.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Blog entity
 * Provides database operations for blog management
 */
@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {

  /**
   * Find all blogs ordered by creation date (newest first)
   * Eagerly fetches author to avoid N+1 query problem
   * @return List of blogs with author information
   */
  @Query("SELECT b FROM Blog b JOIN FETCH b.author ORDER BY b.createdAt DESC")
  List<Blog> findAllWithAuthor();

  /**
   * Find all blogs by author ID
   * @param authorId the author's ID
   * @return List of blogs by the author
   */
  List<Blog> findByAuthorId(Long authorId);
}