package com.blogging.service;

import com.blogging.dto.AuthResponse;
import com.blogging.dto.LoginRequest;
import com.blogging.dto.SignupRequest;
import com.blogging.dto.UserDTO;
import com.blogging.entity.User;
import com.blogging.exception.ResourceAlreadyExistsException;
import com.blogging.repository.UserRepository;
import com.blogging.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class for handling authentication operations
 * Manages user signup, login, and JWT token generation
 */
@Service
@RequiredArgsConstructor
public class AuthService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtUtil jwtUtil;
  private final ModelMapper modelMapper;

  /**
   * Register a new user in the system
   * @param signupRequest Contains email, password, and optional name
   * @return AuthResponse with JWT token and user details
   * @throws ResourceAlreadyExistsException if email already registered
   */
  @Transactional
  public AuthResponse signup(SignupRequest signupRequest) {
    // Check if user already exists
    if (userRepository.existsByEmail(signupRequest.getEmail())) {
      throw new ResourceAlreadyExistsException("Email already registered: " + signupRequest.getEmail());
    }

    // Create new user
    User user = new User();
    user.setEmail(signupRequest.getEmail());
    user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
    user.setName(signupRequest.getName());

    User savedUser = userRepository.save(user);

    // Generate JWT token
    String token = jwtUtil.generateTokenFromUsername(savedUser.getEmail());

    // Map to DTO and return
    UserDTO userDTO = modelMapper.map(savedUser, UserDTO.class);
    return new AuthResponse(token, userDTO);
  }

  /**
   * Authenticate user and generate JWT token
   * @param loginRequest Contains email and password
   * @return AuthResponse with JWT token and user details
   */
  @Transactional(readOnly = true)
  public AuthResponse login(LoginRequest loginRequest) {
    // Authenticate user
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            loginRequest.getEmail(),
            loginRequest.getPassword()
        )
    );

    SecurityContextHolder.getContext().setAuthentication(authentication);

    // Generate JWT token
    String token = jwtUtil.generateToken(authentication);

    // Get user details
    User user = userRepository.findByEmail(loginRequest.getEmail())
        .orElseThrow(() -> new RuntimeException("User not found"));

    // Map to DTO and return
    UserDTO userDTO = modelMapper.map(user, UserDTO.class);
    return new AuthResponse(token, userDTO);
  }

  /**
   * Get current authenticated user's details
   * @return UserDTO of current user
   */
  @Transactional(readOnly = true)
  public UserDTO getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String email = authentication.getName();

    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));

    return modelMapper.map(user, UserDTO.class);
  }
}