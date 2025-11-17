package com.blogging.controller;

import com.blogging.dto.ApiResponse;
import com.blogging.dto.AuthResponse;
import com.blogging.dto.LoginRequest;
import com.blogging.dto.SignupRequest;
import com.blogging.dto.UserDTO;
import com.blogging.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for authentication operations
 * Handles user signup, login, and current user information
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication management APIs")
public class AuthController {

  private final AuthService authService;

  /**
   * Register a new user
   * @param signupRequest User registration details
   * @return Authentication response with JWT token
   */
  @PostMapping("/signup")
  @Operation(summary = "Register a new user", description = "Create a new user account with email and password")
  public ResponseEntity<ApiResponse<AuthResponse>> signup(@Valid @RequestBody SignupRequest signupRequest) {
    AuthResponse authResponse = authService.signup(signupRequest);
    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(ApiResponse.success("User registered successfully", authResponse));
  }

  /**
   * Authenticate user and generate JWT token
   * @param loginRequest User login credentials
   * @return Authentication response with JWT token
   */
  @PostMapping("/login")
  @Operation(summary = "Login user", description = "Authenticate user and return JWT token")
  public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest loginRequest) {
    AuthResponse authResponse = authService.login(loginRequest);
    return ResponseEntity.ok(ApiResponse.success("Login successful", authResponse));
  }

  /**
   * Get current authenticated user's information
   * @return Current user details
   */
  @GetMapping("/me")
  @Operation(summary = "Get current user", description = "Retrieve information about the currently authenticated user")
  public ResponseEntity<ApiResponse<UserDTO>> getCurrentUser() {
    UserDTO userDTO = authService.getCurrentUser();
    return ResponseEntity.ok(ApiResponse.success("User retrieved successfully", userDTO));
  }
}