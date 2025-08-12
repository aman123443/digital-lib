package com.example.bookstore.controller;

import com.example.bookstore.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// A simple DTO to receive the user's prompt
record RecommendationRequest(String prompt) {}

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    /**
     * This method is now a standard, non-reactive (no Mono) endpoint.
     * It directly calls the synchronous service method and returns the result,
     * which resolves the ".map() is not a function" error.
     */
    @PostMapping
    public ResponseEntity<String> getRecommendation(@RequestBody RecommendationRequest request) {
        String recommendation = recommendationService.getBookRecommendation(request.prompt());
        return ResponseEntity.ok(recommendation);
    }
}
