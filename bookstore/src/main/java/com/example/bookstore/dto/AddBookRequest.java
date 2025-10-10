package com.example.bookstore.dto;

import lombok.Data;

@Data
public class AddBookRequest {
    private Long bookId;
    private String shelf; // This will be "WANT_TO_READ", "READING", or "FINISHED"
}