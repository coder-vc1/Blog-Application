package com.blogging.service;

import com.blogging.dto.AIQueryRequest;
import com.blogging.dto.AIQueryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * AI Support Agent Service
 * Provides automated responses to common platform questions
 * Uses a knowledge base for grounded answers
 */
@Service
@RequiredArgsConstructor
public class AIService {

  // Knowledge Base - Contains information about the blogging platform
  private static final Map<String, String> KNOWLEDGE_BASE = new HashMap<>();

  static {
    // Platform Overview
    KNOWLEDGE_BASE.put("what is this platform",
        "This is a Mini Blogging Platform where users can create accounts, write blog posts, " +
            "and read blogs from other users. It's designed to be simple and easy to use.");

    // Authentication
    KNOWLEDGE_BASE.put("how to sign up",
        "To sign up, click on the 'Sign Up' button and provide your email address and password. " +
            "You can also optionally add your name. Once registered, you'll be automatically logged in.");

    KNOWLEDGE_BASE.put("how to login",
        "Click the 'Login' button and enter your registered email and password. " +
            "You'll receive an authentication token that keeps you logged in.");

    KNOWLEDGE_BASE.put("forgot password",
        "Currently, the password reset feature is not available. Please contact support or " +
            "create a new account if you've forgotten your password.");

    // Blog Management
    KNOWLEDGE_BASE.put("how to create blog",
        "After logging in, click on 'Create Blog' or 'New Post' button. " +
            "Enter a title and content for your blog, then click 'Publish'. " +
            "Your blog will be immediately visible to all users.");

    KNOWLEDGE_BASE.put("how to edit blog",
        "You can only edit your own blogs. Navigate to your blog post and click the 'Edit' button. " +
            "Update the title or content and save your changes. Only the author can edit a blog.");

    KNOWLEDGE_BASE.put("how to delete blog",
        "You can only delete your own blogs. Go to your blog post and click the 'Delete' button. " +
            "Confirm the deletion when prompted. This action cannot be undone.");

    KNOWLEDGE_BASE.put("who can see blogs",
        "All published blogs are visible to everyone, including visitors who are not logged in. " +
            "However, only registered and logged-in users can create, edit, or delete blogs.");

    // Features
    KNOWLEDGE_BASE.put("what features available",
        "The platform offers: User registration and authentication, Create/Read/Update/Delete blogs, " +
            "View all published blogs with author information, Edit and delete only your own blogs, " +
            "and this AI support assistant to help answer your questions.");

    KNOWLEDGE_BASE.put("is it free",
        "Yes, this blogging platform is completely free to use. You can create an account " +
            "and publish unlimited blog posts at no cost.");

    // Technical
    KNOWLEDGE_BASE.put("what technology used",
        "The platform is built with Java Spring Boot for the backend, Next.js with React for the frontend, " +
            "MySQL for the database, and uses JWT for secure authentication.");

    // Support
    KNOWLEDGE_BASE.put("get help",
        "You can ask me any questions about how to use the platform. I'm here to help with " +
            "signup, login, creating blogs, editing posts, and general platform information.");

    KNOWLEDGE_BASE.put("contact support",
        "For technical issues or questions not covered by this AI assistant, " +
            "please reach out through the contact form or email support at support@miniblog.com");
  }

  /**
   * Process user query and return AI-generated response
   * Uses keyword matching against knowledge base for grounded answers
   * @param request User's question
   * @return AI response with answer and source
   */
  public AIQueryResponse processQuery(AIQueryRequest request) {
    String question = request.getQuestion().toLowerCase().trim();

    // Find best matching answer from knowledge base
    String answer = findBestMatch(question);

    if (answer != null) {
      return new AIQueryResponse(answer, "Knowledge Base");
    }

    // Default response when no match found
    return new AIQueryResponse(
        "I'm sorry, I don't have specific information about that. " +
            "Here are some topics I can help with:\n" +
            "- How to sign up and login\n" +
            "- Creating, editing, and deleting blogs\n" +
            "- Platform features and usage\n" +
            "- Technical information\n\n" +
            "Please try rephrasing your question or ask about one of these topics.",
        "AI Assistant"
    );
  }

  /**
   * Find best matching answer from knowledge base using keyword matching
   * @param question User's question in lowercase
   * @return Matching answer or null if no match found
   */
  private String findBestMatch(String question) {
    int maxMatchScore = 0;
    String bestAnswer = null;

    for (Map.Entry<String, String> entry : KNOWLEDGE_BASE.entrySet()) {
      String key = entry.getKey();
      int matchScore = calculateMatchScore(question, key);

      if (matchScore > maxMatchScore) {
        maxMatchScore = matchScore;
        bestAnswer = entry.getValue();
      }
    }

    // Require at least 2 matching keywords for a response
    return maxMatchScore >= 2 ? bestAnswer : null;
  }

  /**
   * Calculate match score between question and knowledge base key
   * @param question User's question
   * @param key Knowledge base key
   * @return Number of matching keywords
   */
  private int calculateMatchScore(String question, String key) {
    String[] keyWords = key.split(" ");
    int score = 0;

    for (String word : keyWords) {
      if (question.contains(word)) {
        score++;
      }
    }

    return score;
  }
}