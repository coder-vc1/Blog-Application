package com.blogging.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration class for ModelMapper
 * ModelMapper is used to map between entities and DTOs
 */
@Configuration
public class MapperConfig {

  /**
   * Create and configure ModelMapper bean
   * Sets strict matching strategy for accurate field mapping
   * @return Configured ModelMapper instance
   */
  @Bean
  public ModelMapper modelMapper() {
    ModelMapper modelMapper = new ModelMapper();
    modelMapper.getConfiguration()
        .setMatchingStrategy(MatchingStrategies.STRICT)
        .setSkipNullEnabled(true);
    return modelMapper;
  }
}