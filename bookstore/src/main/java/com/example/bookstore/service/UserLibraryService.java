package com.example.bookstore.service;

import com.example.bookstore.dto.UserBookDTO;
import com.example.bookstore.model.*;
import com.example.bookstore.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserLibraryService {

    @Autowired
    private UserBookRepository userBookRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookRepository bookRepository;

    public void addBookToUserLibrary(String username, Long bookId, String shelf) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        UserBookId userBookId = new UserBookId();
        userBookId.setUserId(user.getId());
        userBookId.setBookId(book.getId());

        // If the book is already on a shelf, update it. Otherwise, create a new entry.
        UserBook userBook = userBookRepository.findById(userBookId).orElse(new UserBook());
        userBook.setId(userBookId);
        userBook.setUser(user);
        userBook.setBook(book);
        userBook.setShelfStatus(shelf);

        userBookRepository.save(userBook);
    }

    public List<UserBookDTO> getBooksForUser(String username) {
        List<UserBook> userBooks = userBookRepository.findByUser_Username(username);
        return userBooks.stream()
                .map(userBook -> UserBookDTO.fromEntity(userBook.getBook(), userBook.getShelfStatus()))
                .collect(Collectors.toList());
    }
}