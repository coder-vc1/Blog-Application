package com.blogging.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogDTO {
  private Long id;
  private String title;
  private String content;
  private UserDTO author;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
}