
package com.blogging;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application class for Mini Blogging Platform
 * Entry point for the Spring Boot application
 */
@SpringBootApplication
@OpenAPIDefinition(
    info = @Info(
        title = "Mini Blogging Platform API",
        version = "1.0",
        description = "REST API for a simple blogging platform with authentication and AI support"
    )
)
@SecurityScheme(
    name = "bearerAuth",
    type = SecuritySchemeType.HTTP,
    bearerFormat = "JWT",
    scheme = "bearer"
)
public class MiniBlogPlatformApplication {

  public static void main(String[] args) {
    SpringApplication.run(MiniBlogPlatformApplication.class, args);
  }
}