package com.blogging.controller;

import com.blogging.dto.ApiResponse;
import com.blogging.dto.BlogDTO;
import com.blogging.dto.CreateBlogRequest;
import com.blogging.dto.UpdateBlogRequest;
import com.blogging.service.BlogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for blog management operations
 * Handles CRUD operations for blog posts
 */
@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
@Tag(name = "Blogs", description = "Blog management APIs")
public class BlogController {

  private final BlogService blogService;

  /**
   * Create a new blog post (requires authentication)
   * @param request Blog creation request with title and content
   * @return Created blog details
   */
  @PostMapping
  @Operation(
      summary = "Create a new blog",
      description = "Create a new blog post. Requires authentication.",
      security = @SecurityRequirement(name = "bearerAuth")
  )
  public ResponseEntity<ApiResponse<BlogDTO>> createBlog(@Valid @RequestBody CreateBlogRequest request) {
    BlogDTO blogDTO = blogService.createBlog(request);
    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(ApiResponse.success("Blog created successfully", blogDTO));
  }

  /**
   * Get all blog posts (public endpoint)
   * @return List of all blogs with author information
   */
  @GetMapping
  @Operation(summary = "Get all blogs", description = "Retrieve all published blogs with author information")
  public ResponseEntity<ApiResponse<List<BlogDTO>>> getAllBlogs() {
    List<BlogDTO> blogs = blogService.getAllBlogs();
    return ResponseEntity.ok(ApiResponse.success("Blogs retrieved successfully", blogs));
  }

  /**
   * Get a specific blog by ID (public endpoint)
   * @param id Blog ID
   * @return Blog details
   */
  @GetMapping("/{id}")
  @Operation(summary = "Get blog by ID", description = "Retrieve a specific blog post by its ID")
  public ResponseEntity<ApiResponse<BlogDTO>> getBlogById(@PathVariable Long id) {
    BlogDTO blogDTO = blogService.getBlogById(id);
    return ResponseEntity.ok(ApiResponse.success("Blog retrieved successfully", blogDTO));
  }

  /**
   * Update a blog post (requires authentication and authorization)
   * Only the author can update their blog
   * @param id Blog ID
   * @param request Update request with new title and content
   * @return Updated blog details
   */
  @PutMapping("/{id}")
  @Operation(
      summary = "Update a blog",
      description = "Update an existing blog post. Only the author can update their blog.",
      security = @SecurityRequirement(name = "bearerAuth")
  )
  public ResponseEntity<ApiResponse<BlogDTO>> updateBlog(
      @PathVariable Long id,
      @Valid @RequestBody UpdateBlogRequest request) {
    BlogDTO blogDTO = blogService.updateBlog(id, request);
    return ResponseEntity.ok(ApiResponse.success("Blog updated successfully", blogDTO));
  }

  /**
   * Delete a blog post (requires authentication and authorization)
   * Only the author can delete their blog
   * @param id Blog ID
   * @return Success message
   */
  @DeleteMapping("/{id}")
  @Operation(
      summary = "Delete a blog",
      description = "Delete a blog post. Only the author can delete their blog.",
      security = @SecurityRequirement(name = "bearerAuth")
  )
  public ResponseEntity<ApiResponse<Void>> deleteBlog(@PathVariable Long id) {
    blogService.deleteBlog(id);
    return ResponseEntity.ok(ApiResponse.success("Blog deleted successfully", null));
  }
}