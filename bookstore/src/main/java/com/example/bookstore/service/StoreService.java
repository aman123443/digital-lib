package com.example.bookstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class StoreService {

    private final WebClient webClient;

    @Value("${gemini.api.key}")
    private String apiKey;

    @Autowired
    public StoreService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://www.googleapis.com/books/v1").build();
    }

    // This method is now synchronous and returns a simple String
    public String searchBooks(String query) {
        try {
            return this.webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/volumes")
                            .queryParam("q", query)
                            .queryParam("key", apiKey)
                            .queryParam("maxResults", 20)
                            .build())
                    .retrieve()
                    .bodyToMono(String.class)
                    .block(); // .block() makes the call synchronous
        } catch (Exception e) {
            System.err.println("Google Books API Error: " + e.getMessage());
            // Return a JSON string with an error field, which the frontend can check for
            return "{\"error\": true, \"message\": \"Failed to fetch books from the store.\"}";
        }
    }
}
