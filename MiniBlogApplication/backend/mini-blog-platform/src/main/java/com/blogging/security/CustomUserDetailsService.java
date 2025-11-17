package com.blogging.security;

import com.blogging.entity.User;
import com.blogging.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

/**
 * Custom UserDetailsService implementation for Spring Security
 * Loads user-specific data for authentication
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;

  /**
   * Load user by email (username) for Spring Security authentication
   * @param email User's email address
   * @return UserDetails object for authentication
   * @throws UsernameNotFoundException if user not found
   */
  @Override
  @Transactional
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() ->
            new UsernameNotFoundException("User not found with email: " + email));

    return new org.springframework.security.core.userdetails.User(
        user.getEmail(),
        user.getPassword(),
        new ArrayList<>() // Empty authorities list (can be extended for roles)
    );
  }

  /**
   * Load user by ID for JWT authentication
   * @param id User's ID
   * @return UserDetails object for authentication
   * @throws UsernameNotFoundException if user not found
   */
  @Transactional
  public UserDetails loadUserById(Long id) throws UsernameNotFoundException {
    User user = userRepository.findById(id)
        .orElseThrow(() ->
            new UsernameNotFoundException("User not found with id: " + id));

    return new org.springframework.security.core.userdetails.User(
        user.getEmail(),
        user.getPassword(),
        new ArrayList<>()
    );
  }
}