package com.example.bookstore.controller;

import com.example.bookstore.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// A simple DTO to receive the user's prompt from the frontend
record RecommendationRequest(String prompt) {}

@RestController
@RequestMapping("/api/v1/recommendations") // Using a versioned API path is good practice
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @PostMapping
    public ResponseEntity<String> getRecommendation(@RequestBody RecommendationRequest request) {
        // It's good practice to validate the input
        if (request.prompt() == null || request.prompt().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Prompt cannot be empty.");
        }

        String recommendation = recommendationService.getBookRecommendation(request.prompt());
        return ResponseEntity.ok(recommendation);
    }
}

