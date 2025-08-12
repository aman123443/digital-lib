package com.example.bookstore.dto.gemini;

import java.util.List;

// Represents the overall request body sent to Gemini
public record GeminiRequest(List<Content> contents) {
    public static record Content(List<Part> parts) {}
    public static record Part(String text) {}
}
