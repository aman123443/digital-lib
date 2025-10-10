package com.example.bookstore.dto;

import com.example.bookstore.model.Book;
import lombok.Data;

@Data
public class UserBookDTO {
    // We can flatten the book properties for easier use in React
    private Long id;
    private String title;
    private String author;
    private String contentUrl;
    private String readUrl;
    private String shelfStatus; // The crucial shelf status

    public static UserBookDTO fromEntity(Book book, String shelfStatus) {
        UserBookDTO dto = new UserBookDTO();
        dto.setId(book.getId());
        dto.setTitle(book.getTitle());
        dto.setAuthor(book.getAuthor());
        dto.setContentUrl(book.getContentUrl());
        dto.setReadUrl(book.getReadUrl());
        dto.setShelfStatus(shelfStatus);
        return dto;
    }
}