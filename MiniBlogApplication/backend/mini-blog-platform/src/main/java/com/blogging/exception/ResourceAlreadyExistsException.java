package com.blogging.exception;

/**
 * Exception thrown when a resource already exists (e.g., duplicate email)
 */
public class ResourceAlreadyExistsException extends RuntimeException {
  public ResourceAlreadyExistsException(String message) {
    super(message);
  }
}