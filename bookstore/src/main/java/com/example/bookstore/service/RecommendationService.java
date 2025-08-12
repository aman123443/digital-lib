package com.example.bookstore.service;

import com.example.bookstore.dto.gemini.GeminiRequest;
import com.example.bookstore.dto.gemini.GeminiResponse;
import com.example.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class RecommendationService {

    private final WebClient webClient;
    private final BookRepository bookRepository;

    @Value("${gemini.api.key}")
    private String apiKey;

    @Autowired
    public RecommendationService(WebClient.Builder webClientBuilder, BookRepository bookRepository) {
        this.webClient = webClientBuilder.baseUrl("https://generativelanguage.googleapis.com").build();
        this.bookRepository = bookRepository;
    }

    // This method is now synchronous and returns a simple String
    public String getBookRecommendation(String userPrompt) {
        // We no longer need to fetch the book list from our database for the prompt.

        // The new, more powerful prompt:
        String fullPrompt = String.format(
                "You are a helpful librarian. A user is looking for a book recommendation. Their request is: \"%s\". " +
                        "Please recommend a real book that fits their request. " +
                        "Format your response as: **Book Title by Author** - Here is a brief summary of why you might like this book...",
                userPrompt
        );

        GeminiRequest.Part part = new GeminiRequest.Part(fullPrompt);
        GeminiRequest.Content content = new GeminiRequest.Content(List.of(part));
        GeminiRequest requestBody = new GeminiRequest(List.of(content));

        try {
            GeminiResponse response = this.webClient.post()
                    .uri("/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(GeminiResponse.class)
                    .block(); // .block() makes the call synchronous

            if (response != null && response.candidates() != null && !response.candidates().isEmpty()) {
                return response.candidates().get(0).content().parts().get(0).text();
            }
            return "Sorry, I couldn't generate a response.";
        } catch (Exception e) {
            System.err.println("Gemini API Error: " + e.getMessage());
            return "I'm having trouble connecting to the recommendation service. Please check the backend logs.";
        }
    }
}
