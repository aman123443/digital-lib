package com.example.bookstore.service;

import com.example.bookstore.dto.gemini.GeminiRequest;
import com.example.bookstore.dto.gemini.GeminiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class RecommendationService {

    private static final Logger logger = LoggerFactory.getLogger(RecommendationService.class);
    private final WebClient webClient;

    @Value("${gemini.api.key}")
    private String apiKey;

    public RecommendationService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://generativelanguage.googleapis.com").build();
    }

    public String getBookRecommendation(String userPrompt) {
        String fullPrompt = String.format(
                "You are a helpful librarian. A user wants a book recommendation based on: \"%s\". " +
                        "Recommend one real, well-known book. Format the response as: " +
                        "**Book Title by Author** - A brief summary of why the user might like it.",
                userPrompt
        );

        GeminiRequest requestBody = new GeminiRequest(
                List.of(new GeminiRequest.Content(
                        List.of(new GeminiRequest.Part(fullPrompt))
                ))
        );

        try {
            GeminiResponse response = this.webClient.post()
                    .uri("/v1beta/models/gemini-1.5-flash:generateContent") // Stable model name
                    .header("x-goog-api-key", this.apiKey) // <-- API KEY IS NOW SECURELY IN THE HEADER
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(GeminiResponse.class)
                    .block(); // .block() makes the web call synchronous

            if (response != null && response.candidates() != null && !response.candidates().isEmpty()) {
                return response.candidates().get(0).content().parts().get(0).text();
            }
            logger.warn("Received an empty or invalid response from Gemini API.");
            return "Sorry, I couldn't generate a response at this time.";

        } catch (Exception e) {
            logger.error("Gemini API Error: {}", e.getMessage(), e);
            return "There was an error connecting to the recommendation service. Please try again later.";
        }
    }
}

