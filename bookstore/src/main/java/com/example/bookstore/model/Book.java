package com.example.bookstore.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;
import jakarta.persistence.OneToMany;

@Entity
@Data
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private String isbn;


    @Column(columnDefinition = "TEXT")
    private String description;

    private String contentUrl;
    private String readUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;
    @OneToMany(mappedBy = "book")
    private Set<UserBook> userBooks;
}
