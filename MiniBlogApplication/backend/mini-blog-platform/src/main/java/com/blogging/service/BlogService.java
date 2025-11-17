package com.blogging.service;

import com.blogging.dto.BlogDTO;
import com.blogging.dto.CreateBlogRequest;
import com.blogging.dto.UpdateBlogRequest;
import com.blogging.dto.UserDTO;
import com.blogging.entity.Blog;
import com.blogging.entity.User;
import com.blogging.exception.ResourceNotFoundException;
import com.blogging.exception.UnauthorizedException;
import com.blogging.repository.BlogRepository;
import com.blogging.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for blog management operations
 * Handles CRUD operations for blogs with proper authorization
 */
@Service
@RequiredArgsConstructor
public class BlogService {

  private final BlogRepository blogRepository;
  private final UserRepository userRepository;
  private final ModelMapper modelMapper;

  /**
   * Create a new blog post
   * @param request Blog creation request with title and content
   * @return Created blog as BlogDTO
   */
  @Transactional
  public BlogDTO createBlog(CreateBlogRequest request) {
    User currentUser = getCurrentUser();

    Blog blog = new Blog();
    blog.setTitle(request.getTitle());
    blog.setContent(request.getContent());
    blog.setAuthor(currentUser);

    Blog savedBlog = blogRepository.save(blog);
    return mapToBlogDTO(savedBlog);
  }

  /**
   * Get all blogs with author information
   * @return List of all blogs as BlogDTOs
   */
  @Transactional(readOnly = true)
  public List<BlogDTO> getAllBlogs() {
    return blogRepository.findAllWithAuthor()
        .stream()
        .map(this::mapToBlogDTO)
        .collect(Collectors.toList());
  }

  /**
   * Get a specific blog by ID
   * @param id Blog ID
   * @return Blog as BlogDTO
   * @throws ResourceNotFoundException if blog not found
   */
  @Transactional(readOnly = true)
  public BlogDTO getBlogById(Long id) {
      Blog blog = blogRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id: " + id));
    return mapToBlogDTO(blog);
  }

  /**
   * Update an existing blog
   * Only the author can update their blog
   * @param id Blog ID
   * @param request Update request with new title and content
   * @return Updated blog as BlogDTO
   * @throws ResourceNotFoundException if blog not found
   * @throws UnauthorizedException if user is not the author
   */
  @Transactional
  public BlogDTO updateBlog(Long id, UpdateBlogRequest request) {
    Blog blog = blogRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id: " + id));

    User currentUser = getCurrentUser();
    if (!blog.getAuthor().getId().equals(currentUser.getId())) {
      throw new UnauthorizedException("You are not authorized to update this blog");
    }

    blog.setTitle(request.getTitle());
    blog.setContent(request.getContent());

    Blog updatedBlog = blogRepository.save(blog);
    return mapToBlogDTO(updatedBlog);
  }

  /**
   * Delete a blog
   * Only the author can delete their blog
   * @param id Blog ID
   * @throws ResourceNotFoundException if blog not found
   * @throws UnauthorizedException if user is not the author
   */
  @Transactional
  public void deleteBlog(Long id) {
    Blog blog = blogRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id: " + id));

    User currentUser = getCurrentUser();
    if (!blog.getAuthor().getId().equals(currentUser.getId())) {
      throw new UnauthorizedException("You are not authorized to delete this blog");
    }

    blogRepository.delete(blog);
  }

  /**
   * Get current authenticated user
   * @return Current User entity
   */
  private User getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String email = authentication.getName();

    return userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));
  }

  /**
   * Map Blog entity to BlogDTO with author information
   * @param blog Blog entity
   * @return BlogDTO with mapped data
   */
  private BlogDTO mapToBlogDTO(Blog blog) {
    BlogDTO blogDTO = modelMapper.map(blog, BlogDTO.class);
    UserDTO authorDTO = modelMapper.map(blog.getAuthor(), UserDTO.class);
    blogDTO.setAuthor(authorDTO);
    return blogDTO;
  }
}