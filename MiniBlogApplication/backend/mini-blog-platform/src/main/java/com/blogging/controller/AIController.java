package com.blogging.controller;

import com.blogging.dto.AIQueryRequest;
import com.blogging.dto.AIQueryResponse;
import com.blogging.dto.ApiResponse;
import com.blogging.service.AIService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for AI Support Agent
 * Handles user queries and returns AI-generated responses
 */
@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@Tag(name = "AI Support", description = "AI-powered support assistant APIs")
public class AIController {

  private final AIService aiService;

  /**
   * Process user query and return AI-generated response
   * @param request User's question
   * @return AI response with answer and source
   */
  @PostMapping("/query")
  @Operation(
      summary = "Query AI support agent",
      description = "Ask questions about the platform and get AI-powered responses from the knowledge base"
  )
  public ResponseEntity<ApiResponse<AIQueryResponse>> queryAI(@Valid @RequestBody AIQueryRequest request) {
    AIQueryResponse response = aiService.processQuery(request);
    return ResponseEntity.ok(ApiResponse.success("Query processed successfully", response));
  }

  /**
   * Get information about the AI support agent
   * @return Agent information and capabilities
   */
  @GetMapping("/info")
  @Operation(summary = "Get AI agent info", description = "Get information about AI support agent capabilities")
  public ResponseEntity<ApiResponse<String>> getAgentInfo() {
    String info = "AI Support Agent - Ask me anything about the blogging platform! " +
        "I can help with signup, login, creating blogs, editing posts, and platform features.";
    return ResponseEntity.ok(ApiResponse.success("Agent info retrieved", info));
  }
}