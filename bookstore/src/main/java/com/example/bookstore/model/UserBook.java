package com.example.bookstore.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_books")
@Data
public class UserBook {

    @EmbeddedId
    private UserBookId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId") // Maps the userId part of the composite key
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("bookId") // Maps the bookId part of the composite key
    @JoinColumn(name = "book_id")
    private Book book;

    @Column(name = "shelf_status")
    private String shelfStatus;
}