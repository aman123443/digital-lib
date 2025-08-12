package com.example.bookstore.dto.gemini;

import java.util.List;

// Represents the JSON response received from Gemini
public record GeminiResponse(List<Candidate> candidates) {
    public static record Candidate(Content content) {}
    public static record Content(List<Part> parts) {}
    public static record Part(String text) {}
}
