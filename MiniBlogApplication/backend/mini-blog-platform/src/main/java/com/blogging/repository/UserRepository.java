package com.blogging.repository;

import com.blogging.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for User entity
 * Provides database operations for user management
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  /**
   * Find user by email address
   * @param email the email to search for
   * @return Optional containing user if found
   */
  Optional<User> findByEmail(String email);

  /**
   * Check if user exists with given email
   * @param email the email to check
   * @return true if user exists, false otherwise
   */
  Boolean existsByEmail(String email);
}