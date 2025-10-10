package com.example.bookstore.repository;

import com.example.bookstore.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List; // 1. Add this import

public interface BookRepository extends JpaRepository<Book, Long> {

    /**
     * Explanation of Change:
     * This new method signature tells Spring Data JPA to create a query for us automatically.
     * By naming it "findByUserUsername", Spring understands that it should look for Book
     * entities where the 'user' field has a 'username' property that matches the
     * string provided in the method parameter.
     */
    List<Book> findByUserUsername(String username); // 2. Add this method
}